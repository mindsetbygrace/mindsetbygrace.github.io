#!/usr/bin/env node
/**
 * Mindset by Grace — mise à jour automatique des vidéos YouTube.
 *
 * Sources (aucune clé API nécessaire) :
 *   1. onglets « Vidéos » et « Shorts » de la chaîne (liste complète, avec pagination)
 *   2. flux RSS officiel (15 dernières publications, filet de sécurité)
 *   3. page de chaque vidéo (date exacte, vues, durée)
 *
 * Résultat :
 *   - data/videos.json  (données brutes)
 *   - index.html        (blocs entre <!-- VIDEOS:START/END --> et <!-- STATS:START/END -->)
 *
 * Usage : node scripts/update-videos.mjs [--offline]
 *   --offline : ne contacte pas YouTube, régénère seulement le HTML depuis data/videos.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CHANNEL = {
  id: 'UCfDVuBlNTCCBB9S6nu3jGdQ',
  handle: 'MindsetbyGrace',
  url: 'https://www.youtube.com/@MindsetbyGrace',
};

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(ROOT, 'data', 'videos.json');
const HTML_FILE = path.join(ROOT, 'index.html');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const MAX_PAGES = 20;
const FEATURED_GRID_LIMIT = 6;

/* ------------------------------------------------------------------ */
/* Fonctions pures (testées dans tests/videos.test.mjs)                */
/* ------------------------------------------------------------------ */

/** "20,2 k" → 20200 ; "1,4 M" → 1400000 ; "6 539" → 6539 ; "146K" → 146000 */
export function parseCount(text) {
  if (text == null) return null;
  const s = String(text).replace(/[  ]/g, ' ').trim();
  const m = s.match(/(\d{1,3}(?:[\s.,]\d{1,3})*)\s*(Md|[kKmMB](?![\p{L}]))?/u);
  if (!m) return null;
  let num = m[1].trim();
  const suffix = m[2];
  if (suffix) {
    num = num.replace(/\s/g, '').replace(',', '.');
  } else {
    num = num.replace(/[\s.,]/g, '');
  }
  const value = parseFloat(num);
  if (Number.isNaN(value)) return null;
  const mult = !suffix ? 1 : /k/i.test(suffix) ? 1e3 : /^m$/i.test(suffix) ? 1e6 : 1e9;
  return Math.round(value * mult);
}

/** "18:28" → 1108 ; "1:02:03" → 3723 */
export function parseDuration(text) {
  if (!text || !/^\d+(:\d{2}){1,2}$/.test(text.trim())) return null;
  return text.trim().split(':').reduce((acc, part) => acc * 60 + Number(part), 0);
}

/** 1108 → "18:28" ; 3723 → "1:02:03" */
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** 6539 → "6,5 k" ; 182000 → "182 k" ; 1400000 → "1,4 M" (format FR compact) */
export function formatCount(n) {
  if (n == null) return '';
  if (n < 1000) return String(n);
  const units = [[1e9, 'Md'], [1e6, 'M'], [1e3, 'k']];
  for (const [div, unit] of units) {
    if (n >= div) {
      const v = n / div;
      const rounded = v >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
      return `${String(rounded).replace('.', ',')} ${unit}`;
    }
  }
  return String(n);
}

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

/** "2026-11-10T21:05:58+00:00" → "10 nov. 2026" */
export function formatDateFr(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Retire les hashtags d'un titre de Short pour l'affichage */
export function cleanTitle(title) {
  return String(title || '').replace(/\s*#[\p{L}\p{N}_]+/gu, '').replace(/\s{2,}/g, ' ').trim() || String(title || '');
}

export function watchUrl(v) {
  return v.type === 'short'
    ? `https://www.youtube.com/shorts/${v.id}`
    : `https://www.youtube.com/watch?v=${v.id}`;
}

export function thumbUrl(v) {
  return v.thumbnail || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
}

/** Remplace le contenu entre <!-- NAME:START --> et <!-- NAME:END --> */
export function injectBetweenMarkers(html, name, content) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(\\s*<!-- ${name}:END -->)`);
  if (!re.test(html)) throw new Error(`Marqueurs ${name}:START / ${name}:END introuvables dans index.html`);
  return html.replace(re, (_, start, end) => `${start}\n${content}${end}`);
}

/**
 * Fusionne les sources. `complete` = la liste des onglets est fiable,
 * donc les vidéos absentes (supprimées / privées) sont retirées.
 */
export function mergeVideos(previous, { tabs = [], rss = [], details = {} }, complete) {
  const prevById = new Map(previous.map((v) => [v.id, v]));
  const order = [];
  const seen = new Set();
  const push = (id) => { if (!seen.has(id)) { seen.add(id); order.push(id); } };
  tabs.forEach((v) => push(v.id));
  rss.forEach((v) => push(v.id));
  if (!complete) previous.forEach((v) => push(v.id));

  const tabById = new Map(tabs.map((v) => [v.id, v]));
  const rssById = new Map(rss.map((v) => [v.id, v]));

  const merged = order.map((id) => {
    const prev = prevById.get(id) || {};
    const tab = tabById.get(id) || {};
    const feed = rssById.get(id) || {};
    const det = details[id] || {};
    const duration = det.duration ?? tab.duration ?? prev.duration ?? null;
    const type = tab.type || feed.type || prev.type || (duration && duration <= 180 ? 'short' : 'video');
    return {
      id,
      type,
      title: det.title || tab.title || feed.title || prev.title || '',
      published: det.published || feed.published || prev.published || null,
      duration,
      views: det.views ?? feed.views ?? tab.views ?? prev.views ?? null,
      thumbnail: prev.thumbnail || tab.thumbnail || null,
    };
  }).filter((v) => v.title);

  merged.sort((a, b) => String(b.published || '').localeCompare(String(a.published || '')));
  return merged;
}

export function computeStats(videos, channel) {
  return {
    subscribers: channel.subscribers ?? null,
    videos: videos.filter((v) => v.type === 'video').length,
    shorts: videos.filter((v) => v.type === 'short').length,
    views: videos.reduce((sum, v) => sum + (v.views || 0), 0),
  };
}

/* ---------------------------- Rendu HTML ---------------------------- */

const PLAY_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M8 5.5v13l11-6.5z"/></svg>';
const I = '          '; // indentation de base dans .section-inner

function metaLine(v) {
  const parts = [];
  if (v.published) parts.push(`<time datetime="${escapeHtml(v.published)}" data-date="${escapeHtml(v.published)}">${formatDateFr(v.published)}</time>`);
  if (v.views != null) parts.push(`<span data-views="${v.views}">${formatCount(v.views)} vues</span>`);
  return parts.join('<span aria-hidden="true"> · </span>');
}

function videoAttrs(v) {
  return `href="${watchUrl(v)}" target="_blank" rel="noopener" data-video-id="${escapeHtml(v.id)}" data-video-type="${v.type}" data-published="${escapeHtml(v.published || '')}"`;
}

export function renderFeatured(v) {
  const title = escapeHtml(v.title);
  return [
    `${I}<article class="video-featured">`,
    `${I}  <a class="video-featured-media" ${videoAttrs(v)} aria-label="Regarder : ${title}">`,
    `${I}    <img src="${thumbUrl(v)}" alt="" width="1280" height="720" loading="lazy" decoding="async">`,
    `${I}    <span class="video-badge" data-i18n="videos.latest">Dernière vidéo</span>`,
    v.duration ? `${I}    <span class="video-duration">${formatDuration(v.duration)}</span>` : null,
    `${I}    <span class="video-play video-play--big" aria-hidden="true">${PLAY_SVG}</span>`,
    `${I}  </a>`,
    `${I}  <div class="video-featured-text">`,
    `${I}    <p class="video-meta">${metaLine(v)}</p>`,
    `${I}    <h3>${title}</h3>`,
    `${I}    <a class="btn btn-primary" ${videoAttrs(v)} data-i18n="videos.watch">Regarder maintenant</a>`,
    `${I}  </div>`,
    `${I}</article>`,
  ].filter(Boolean).join('\n');
}

export function renderCard(v, index) {
  const title = escapeHtml(v.type === 'short' ? cleanTitle(v.title) : v.title);
  const cls = v.type === 'short' ? 'video-card video-card--short' : 'video-card';
  const hidden = v.type === 'video' && index >= FEATURED_GRID_LIMIT ? ' data-extra' : '';
  return [
    `${I}  <a class="${cls}" ${videoAttrs(v)} style="--i:${index % 12}"${hidden}>`,
    `${I}    <span class="video-thumb">`,
    `${I}      <img src="${thumbUrl(v)}" alt="" width="${v.type === 'short' ? 405 : 1280}" height="720" loading="lazy" decoding="async">`,
    v.type === 'video' && v.duration ? `${I}      <span class="video-duration">${formatDuration(v.duration)}</span>` : null,
    v.type === 'short' && v.views != null ? `${I}      <span class="video-duration video-views"><span data-views="${v.views}">${formatCount(v.views)} vues</span></span>` : null,
    `${I}      <span class="video-new" data-i18n="videos.new" hidden>Nouveau</span>`,
    `${I}      <span class="video-play" aria-hidden="true">${PLAY_SVG}</span>`,
    `${I}    </span>`,
    `${I}    <span class="video-title">${title}</span>`,
    v.type === 'video' ? `${I}    <span class="video-meta">${metaLine(v)}</span>` : null,
    `${I}  </a>`,
  ].filter(Boolean).join('\n');
}

export function renderVideosSection(data) {
  const longs = data.videos.filter((v) => v.type === 'video');
  const shorts = data.videos.filter((v) => v.type === 'short');
  const [featured, ...rest] = longs;
  const out = [];
  if (featured) out.push(renderFeatured(featured));
  out.push(
    `${I}<div class="video-panel" data-panel="video">`,
    `${I}  <h3 class="panel-title"><span data-i18n="videos.tab.videos">Vidéos</span> <span class="tab-count">${longs.length}</span></h3>`,
    `${I}  <div class="video-grid">`,
    ...rest.map((v, i) => renderCard(v, i).replace(/^/gm, '  ')),
    `${I}  </div>`,
    rest.length > FEATURED_GRID_LIMIT
      ? `${I}  <div class="video-more-wrap"><button type="button" class="btn btn-social video-more" hidden data-i18n="videos.more">Voir toutes les vidéos</button></div>`
      : null,
    `${I}</div>`,
    shorts.length ? `${I}<div class="video-panel video-panel--shorts" data-panel="short">` : null,
    shorts.length ? `${I}  <h3 class="panel-title"><span data-i18n="videos.tab.shorts">Shorts</span> <span class="tab-count">${shorts.length}</span></h3>` : null,
    shorts.length ? `${I}  <div class="shorts-grid">` : null,
    ...shorts.map((v, i) => renderCard(v, i).replace(/^/gm, '  ')),
    shorts.length ? `${I}  </div>` : null,
    shorts.length ? `${I}</div>` : null,
    `${I}<p class="video-updated">`,
    `${I}  <span data-i18n="videos.updated">Mis à jour automatiquement le</span> <time datetime="${escapeHtml(data.updatedAt)}" data-date="${escapeHtml(data.updatedAt)}">${formatDateFr(data.updatedAt)}</time>`,
    `${I}  · <a href="${CHANNEL.url}?sub_confirmation=1" target="_blank" rel="noopener" data-i18n="videos.subscribe">S'abonner à la chaîne</a>`,
    `${I}</p>`,
  );
  return out.filter((l) => l !== null).join('\n');
}

export function renderStats(data) {
  const s = data.stats;
  const item = (value, key, label) => value
    ? [
        `${I}<div class="stat">`,
        `${I}  <span class="stat-value" data-count="${value}">${formatCount(value)}</span>`,
        `${I}  <span class="stat-label" data-i18n="${key}">${label}</span>`,
        `${I}</div>`,
      ].join('\n')
    : null;
  return [
    item(s.subscribers, 'stats.subscribers', 'abonnés YouTube'),
    item(s.views, 'stats.views', 'vues cumulées'),
    item(s.videos + s.shorts, 'stats.videos', 'vidéos publiées'),
  ].filter(Boolean).join('\n');
}

/** Cartes flottantes du hero : dernière vidéo + abonnés */
export function renderHero(data) {
  const J = '          ';
  const latest = data.videos.find((v) => v.type === 'video');
  const out = [];
  if (data.stats?.subscribers) {
    out.push(
      `${J}<div class="hero-chip">`,
      `${J}  <span class="hero-chip-icon" aria-hidden="true">${PLAY_SVG}</span>`,
      `${J}  <span><strong data-count="${data.stats.subscribers}">${formatCount(data.stats.subscribers)}</strong> <span data-i18n="hero.subs">abonnés</span></span>`,
      `${J}</div>`,
    );
  }
  if (latest) {
    out.push(
      `${J}<a class="hero-latest" ${videoAttrs(latest)}>`,
      `${J}  <span class="hero-latest-thumb"><img src="${thumbUrl(latest)}" alt="" width="1280" height="720" decoding="async"><span class="video-play" aria-hidden="true">${PLAY_SVG}</span></span>`,
      `${J}  <span class="hero-latest-text">`,
      `${J}    <span class="hero-latest-label"><span class="live-dot" aria-hidden="true"></span><span data-i18n="hero.latest">Nouvelle vidéo</span></span>`,
      `${J}    <span class="hero-latest-title">${escapeHtml(latest.title)}</span>`,
      `${J}  </span>`,
      `${J}</a>`,
    );
  }
  return out.join('\n');
}

export function renderHtml(html, data) {
  let out = injectBetweenMarkers(html, 'HERO', renderHero(data));
  out = injectBetweenMarkers(out, 'VIDEOS', renderVideosSection(data));
  out = injectBetweenMarkers(out, 'STATS', renderStats(data));
  return out;
}

/* ------------------------------------------------------------------ */
/* Collecte réseau                                                      */
/* ------------------------------------------------------------------ */

async function fetchText(url, init = {}, tries = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          'User-Agent': UA,
          'Accept-Language': 'fr-FR,fr;q=0.9',
          Cookie: 'SOCS=CAI; CONSENT=YES+1',
          ...(init.headers || {}),
        },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} sur ${url}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
  throw lastErr;
}

function extractJson(html, varName) {
  const m = html.match(new RegExp(`var ${varName} = (\\{.*?\\});</script>`, 's'));
  return m ? JSON.parse(m[1]) : null;
}

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const key of Object.keys(node)) walk(node[key], visit);
}

/** Extrait les vidéos et le jeton de continuation d'un fragment ytInitialData */
export function extractTabItems(node, type) {
  const items = [];
  let continuation = null;
  walk(node, (o) => {
    if (o.lockupViewModel && o.lockupViewModel.contentId
      && (!o.lockupViewModel.contentType || o.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO')) {
      const l = o.lockupViewModel;
      const json = JSON.stringify(l.contentImage || {});
      const badge = (json.match(/"thumbnailBadgeViewModel":\{"text":"([^"]+)"/) || [])[1];
      const rows = l.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel?.metadataRows || [];
      const viewsText = rows.flatMap((r) => (r.metadataParts || []).map((p) => p.text?.content || ''))[0];
      items.push({
        id: l.contentId,
        type,
        title: l.metadata?.lockupMetadataViewModel?.title?.content || '',
        duration: parseDuration(badge),
        views: parseCount(viewsText),
      });
    } else if (o.shortsLockupViewModel) {
      const s = o.shortsLockupViewModel;
      const id = (JSON.stringify(s.onTap || {}).match(/"videoId":"([\w-]{11})"/) || [])[1];
      if (id) {
        items.push({
          id,
          type: 'short',
          title: s.overlayMetadata?.primaryText?.content || '',
          views: parseCount(s.overlayMetadata?.secondaryText?.content),
        });
      }
    } else if (o.videoRenderer && o.videoRenderer.videoId) {
      const v = o.videoRenderer;
      items.push({
        id: v.videoId,
        type,
        title: v.title?.runs?.[0]?.text || v.title?.simpleText || '',
        duration: parseDuration(v.lengthText?.simpleText),
        views: parseCount(v.viewCountText?.simpleText),
      });
    } else if (o.continuationItemRenderer) {
      const token = o.continuationItemRenderer.continuationEndpoint?.continuationCommand?.token;
      if (token) continuation = token;
    }
  });
  return { items, continuation };
}

async function scrapeTab(tab, type) {
  const html = await fetchText(`${CHANNEL.url}/${tab}`);
  const data = extractJson(html, 'ytInitialData');
  if (!data) throw new Error(`ytInitialData introuvable (${tab})`);
  const clientVersion = (html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/) || [])[1] || '2.20250101.00.00';

  let { items, continuation } = extractTabItems(data.contents, type);
  const subsText = (JSON.stringify(data.header || {}).match(/"content":"([^"]*?)\s*(?:abonnés|subscribers)"/) || [])[1];

  for (let page = 0; continuation && page < MAX_PAGES; page++) {
    const body = JSON.stringify({
      context: { client: { clientName: 'WEB', clientVersion, hl: 'fr', gl: 'FR' } },
      continuation,
    });
    const json = JSON.parse(await fetchText('https://www.youtube.com/youtubei/v1/browse?prettyPrint=false', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }));
    const next = extractTabItems(json.onResponseReceivedActions || json, type);
    items = items.concat(next.items);
    continuation = next.continuation;
  }

  const unique = [...new Map(items.map((v) => [v.id, v])).values()];
  return { items: unique, subscribers: parseCount(subsText) };
}

export function parseRss(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => {
    const get = (re) => (e.match(re) || [])[1];
    const decode = (s) => (s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const link = get(/<link rel="alternate" href="([^"]+)"/) || '';
    return {
      id: get(/<yt:videoId>([^<]+)</),
      title: decode(get(/<title>([^<]+)</)),
      published: get(/<published>([^<]+)</),
      views: Number(get(/<media:statistics views="(\d+)"/)) || null,
      type: link.includes('/shorts/') ? 'short' : 'video',
    };
  }).filter((v) => v.id);
}

async function fetchDetails(id) {
  const html = await fetchText(`https://www.youtube.com/watch?v=${id}`);
  const get = (re) => (html.match(re) || [])[1];
  const published = get(/"publishDate":"([^"]+)"/) || get(/"uploadDate":"([^"]+)"/);
  const views = get(/"viewCount":"(\d+)"/);
  const duration = get(/"lengthSeconds":"(\d+)"/);
  return {
    published: published ? new Date(published).toISOString() : undefined,
    views: views ? Number(views) : undefined,
    duration: duration ? Number(duration) : undefined,
  };
}

async function urlExists(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function bestThumbnail(v) {
  const preferred = v.type === 'short'
    ? `https://i.ytimg.com/vi/${v.id}/oardefault.jpg`
    : `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
  return (await urlExists(preferred)) ? preferred : `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
}

async function mapLimit(list, limit, fn) {
  const results = new Array(list.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, list.length) }, async () => {
    while (next < list.length) {
      const i = next++;
      results[i] = await fn(list[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { channel: { ...CHANNEL }, videos: [] };
  }
}

function log(...args) { console.log('[videos]', ...args); }

async function collect(previous) {
  let tabs = [];
  let subscribers = previous.channel?.subscribers ?? null;
  let complete = true;

  for (const [tab, type] of [['videos', 'video'], ['shorts', 'short']]) {
    try {
      const res = await scrapeTab(tab, type);
      log(`onglet ${tab} : ${res.items.length} éléments`);
      if (!res.items.length) complete = false;
      tabs = tabs.concat(res.items);
      if (res.subscribers) subscribers = res.subscribers;
    } catch (err) {
      complete = false;
      log(`⚠ onglet ${tab} indisponible : ${err.message}`);
    }
  }

  let rss = [];
  try {
    rss = parseRss(await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL.id}`));
    log(`flux RSS : ${rss.length} éléments`);
  } catch (err) {
    log(`⚠ flux RSS indisponible : ${err.message}`);
  }

  if (!tabs.length && !rss.length) {
    throw new Error('Aucune source YouTube accessible — données existantes conservées.');
  }

  const ids = [...new Set([...tabs, ...rss].map((v) => v.id))];
  const details = {};
  await mapLimit(ids, 4, async (id) => {
    try {
      details[id] = await fetchDetails(id);
    } catch (err) {
      log(`⚠ détails indisponibles pour ${id} : ${err.message}`);
    }
  });

  const videos = mergeVideos(previous.videos || [], { tabs, rss, details }, complete);
  await mapLimit(videos.filter((v) => !v.thumbnail), 6, async (v) => { v.thumbnail = await bestThumbnail(v); });

  return { videos, subscribers };
}

function stripVolatile(data) {
  const { updatedAt, ...rest } = data;
  return JSON.stringify(rest);
}

async function main() {
  const offline = process.argv.includes('--offline');
  const previous = readData();
  let data = previous;

  if (!offline) {
    const { videos, subscribers } = await collect(previous);
    const channel = { ...CHANNEL, subscribers };
    data = {
      updatedAt: previous.updatedAt,
      channel,
      stats: computeStats(videos, channel),
      videos,
    };
    if (stripVolatile(data) !== stripVolatile(previous)) {
      data.updatedAt = new Date().toISOString();
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
      log(`data/videos.json mis à jour (${data.stats.videos} vidéos, ${data.stats.shorts} shorts)`);
    } else {
      log('aucun changement côté YouTube');
    }
  }

  const html = fs.readFileSync(HTML_FILE, 'utf8');
  const next = renderHtml(html, data);
  if (next !== html) {
    fs.writeFileSync(HTML_FILE, next);
    log('index.html régénéré');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('[videos] ✖', err.message);
    process.exit(1);
  });
}
