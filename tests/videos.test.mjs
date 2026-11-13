import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseCount, parseDuration, formatDuration, formatCount, cleanTitle,
  injectBetweenMarkers, mergeVideos, parseRss, renderHtml,
} from '../scripts/update-videos.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'videos.json'), 'utf8'));

test('parseCount comprend les formats YouTube FR/EN', () => {
  assert.equal(parseCount('20,2 k abonnés'), 20200);
  assert.equal(parseCount('1,4 M'), 1400000);
  assert.equal(parseCount('6 539 vues'), 6539);
  assert.equal(parseCount('146K'), 146000);
  assert.equal(parseCount(null), null);
});

test('durées : analyse et formatage', () => {
  assert.equal(parseDuration('18:28'), 1108);
  assert.equal(parseDuration('1:02:03'), 3723);
  assert.equal(parseDuration('SHORTS'), null);
  assert.equal(formatDuration(1108), '18:28');
  assert.equal(formatDuration(3723), '1:02:03');
});

test('formatCount compact en français', () => {
  assert.equal(formatCount(950), '950');
  assert.equal(formatCount(6539), '6,5 k');
  assert.equal(formatCount(182000), '182 k');
  assert.equal(formatCount(1409345), '1,4 M');
});

test('cleanTitle retire les hashtags', () => {
  assert.equal(cleanTitle('Comment attirer la chance ? #développementpersonnel #motivation'), 'Comment attirer la chance ?');
});

test('injectBetweenMarkers remplace uniquement le bloc ciblé', () => {
  const src = 'a\n<!-- X:START -->\nold\n<!-- X:END -->\nb';
  assert.equal(injectBetweenMarkers(src, 'X', 'new'), 'a\n<!-- X:START -->\nnew\n<!-- X:END -->\nb');
  assert.throws(() => injectBetweenMarkers('rien', 'X', 'new'));
});

test('mergeVideos : liste complète fait foi, sinon on conserve l\'existant', () => {
  const previous = [
    { id: 'old', type: 'video', title: 'Ancienne', published: '2026-01-01T00:00:00Z', thumbnail: 't' },
  ];
  const tabs = [{ id: 'new', type: 'short', title: 'Nouvelle #tag' }];
  const details = { new: { published: '2026-11-01T00:00:00Z', views: 10, duration: 40 } };
  const complete = mergeVideos(previous, { tabs, details }, true);
  assert.deepEqual(complete.map((v) => v.id), ['new']);
  const partial = mergeVideos(previous, { tabs, details }, false);
  assert.deepEqual(partial.map((v) => v.id), ['new', 'old']);
  assert.equal(partial[1].thumbnail, 't');
});

test('parseRss détecte les Shorts', () => {
  const xml = `<feed><entry><yt:videoId>abc12345678</yt:videoId><title>Titre &amp; co</title>
    <link rel="alternate" href="https://www.youtube.com/shorts/abc12345678"/>
    <published>2026-11-01T00:00:00+00:00</published><media:statistics views="42"/></entry></feed>`;
  const [v] = parseRss(xml);
  assert.equal(v.type, 'short');
  assert.equal(v.title, 'Titre & co');
  assert.equal(v.views, 42);
});

test('data/videos.json est cohérent', () => {
  assert.ok(Array.isArray(data.videos) && data.videos.length > 0, 'aucune vidéo');
  for (const v of data.videos) {
    assert.match(v.id, /^[\w-]{11}$/, `id invalide : ${v.id}`);
    assert.ok(v.type === 'video' || v.type === 'short', `type invalide : ${v.id}`);
    assert.ok(v.title, `titre manquant : ${v.id}`);
  }
});

test('index.html contient toutes les vidéos du JSON et est à jour', () => {
  for (const v of data.videos) {
    assert.ok(html.includes(`data-video-id="${v.id}"`), `vidéo absente du HTML : ${v.id}`);
  }
  assert.equal(renderHtml(html, data), html, 'index.html n\'est pas synchronisé : lancez `npm run render`');
});
