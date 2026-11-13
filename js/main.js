/* Mindset by Grace — FR/EN, révélations, particules, vidéos (onglets, lecteur), statistiques */
(function () {
  'use strict';

  var translations = {
    fr: {
      'meta.title': "Mindset by Grace — Vous n'êtes pas ici par hasard",
      'lang.label': 'Changer de langue',
      'a11y.skip': 'Aller au contenu',
      'nav.about': 'À propos',
      'nav.mindset': 'Le Mindset',
      'nav.videos': 'Vidéos',
      'nav.social': 'La suivre',
      'hero.eyebrow': 'Coach en développement personnel',
      'hero.title': "Vous n'êtes pas ici par hasard.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "Je suis Grace. J'aide celles et ceux qui sont prêts à cesser de courir après le respect et les opportunités — et à les attirer par le calme, le charisme et le Winner's Mindset.",
      'hero.cta': 'Voir ses vidéos',
      'hero.cta2': 'Découvrir Grace',
      'hero.proof': 'Une nouvelle vidéo chaque semaine sur YouTube, TikTok & Facebook',
      'hero.latest': 'Nouvelle vidéo',
      'hero.subs': 'abonnés',
      'stats.subscribers': 'abonnés YouTube',
      'stats.views': 'vues cumulées',
      'stats.videos': 'vidéos publiées',
      'about.eyebrow': 'À propos',
      'about.title': 'Qui est Grace ?',
      'about.p1': "Grace est une créatrice de contenu en développement personnel, active depuis 2024. À travers Mindset by Grace, elle partage un message simple et puissant : le charisme n'est pas un don de naissance — c'est un état d'esprit qui s'apprend.",
      'about.p2': "Sa mission : vous aider à devenir la meilleure version de vous-même — présence, calme, magnétisme. Plus de 80 000 personnes suivent déjà ses conseils pour développer un mindset de gagnant.",
      'about.quote': "« Le respect et les opportunités ne se poursuivent pas. Ils s'attirent. »",
      'about.badge': 'Nouvelle vidéo chaque semaine',
      'pillars.eyebrow': "Le Winner's Mindset",
      'pillars.title': 'Trois piliers pour devenir magnétique',
      'pillars.p1.title': "Le charisme s'apprend",
      'pillars.p1.text': "Le charisme est un état d'esprit, pas un don de naissance. Penser, agir et se tenir comme une personne charismatique — cela se travaille, chaque jour.",
      'pillars.p2.title': 'Le pouvoir du calme',
      'pillars.p2.text': "L'agitation et l'inconfort tuent le charisme. Que vous soyez en colère ou très heureux, gardez votre calme : la maîtrise de soi est votre plus grande force.",
      'pillars.p3.title': 'Attirer au lieu de poursuivre',
      'pillars.p3.text': 'Cessez de courir après le respect et les opportunités. Élevez votre standard, incarnez votre valeur — et laissez-les venir à vous.',
      'videos.eyebrow': 'Sur YouTube',
      'videos.title': 'Ses dernières vidéos',
      'videos.subscribeBtn': "S'abonner",
      'videos.latest': 'Dernière vidéo',
      'videos.watch': 'Regarder maintenant',
      'videos.new': 'Nouveau',
      'videos.tab.videos': 'Vidéos',
      'videos.tab.shorts': 'Shorts',
      'videos.more': 'Voir toutes les vidéos',
      'videos.less': 'Voir moins',
      'videos.updated': 'Mis à jour automatiquement le',
      'videos.subscribe': "S'abonner à la chaîne",
      'videos.views': 'vues',
      'social.eyebrow': 'Rejoignez la communauté',
      'social.title': 'Retrouvez Grace',
      'social.subtitle': 'Chaque semaine, du contenu intentionnel pour nourrir votre charisme et votre mindset.',
      'social.yt': 'Vidéos longues & Shorts',
      'social.tt': 'Conseils express au quotidien',
      'social.fb': 'La communauté et les échanges',
      'player.close': 'Fermer',
      'player.open': 'Ouvrir sur YouTube',
      'footer.slogan': "You're not here by chance."
    },
    en: {
      'meta.title': "Mindset by Grace — You're not here by chance",
      'lang.label': 'Switch language',
      'a11y.skip': 'Skip to content',
      'nav.about': 'About',
      'nav.mindset': 'The Mindset',
      'nav.videos': 'Videos',
      'nav.social': 'Follow',
      'hero.eyebrow': 'Personal development coach',
      'hero.title': "You're not here by chance.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "I'm Grace. I help those who are ready to stop chasing respect and opportunities — and start attracting them instead, through calm, charisma and the Winner's Mindset.",
      'hero.cta': 'Watch her videos',
      'hero.cta2': 'Discover Grace',
      'hero.proof': 'A new video every week on YouTube, TikTok & Facebook',
      'hero.latest': 'New video',
      'hero.subs': 'subscribers',
      'stats.subscribers': 'YouTube subscribers',
      'stats.views': 'total views',
      'stats.videos': 'videos published',
      'about.eyebrow': 'About',
      'about.title': 'Who is Grace?',
      'about.p1': 'Grace is a personal development content creator, active since 2024. Through Mindset by Grace, she shares one simple, powerful message: charisma is not a gift — it is a mindset that can be learned.',
      'about.p2': "Her mission: help you become the best version of yourself — presence, calm, magnetism. More than 80,000 people already follow her advice to build a winner's mindset.",
      'about.quote': '"Respect and opportunities are not chased. They are attracted."',
      'about.badge': 'A new video every week',
      'pillars.eyebrow': "The Winner's Mindset",
      'pillars.title': 'Three pillars to become magnetic',
      'pillars.p1.title': 'Charisma can be learned',
      'pillars.p1.text': 'Charisma is a mindset, not a birthright. Thinking, acting and carrying yourself like a charismatic person — that is something you build, every day.',
      'pillars.p2.title': 'The power of calm',
      'pillars.p2.text': 'Restlessness and discomfort kill charisma. Whether you are angry or overjoyed, stay calm: self-mastery is your greatest strength.',
      'pillars.p3.title': 'Attract instead of chase',
      'pillars.p3.text': 'Stop chasing respect and opportunities. Raise your standard, embody your worth — and let them come to you.',
      'videos.eyebrow': 'On YouTube',
      'videos.title': 'Her latest videos',
      'videos.subscribeBtn': 'Subscribe',
      'videos.latest': 'Latest video',
      'videos.watch': 'Watch now',
      'videos.new': 'New',
      'videos.tab.videos': 'Videos',
      'videos.tab.shorts': 'Shorts',
      'videos.more': 'See all videos',
      'videos.less': 'See less',
      'videos.updated': 'Automatically updated on',
      'videos.subscribe': 'Subscribe to the channel',
      'videos.views': 'views',
      'social.eyebrow': 'Join the community',
      'social.title': 'Follow Grace',
      'social.subtitle': 'Every week, intentional content to feed your charisma and your mindset.',
      'social.yt': 'Long videos & Shorts',
      'social.tt': 'Quick daily tips',
      'social.fb': 'Community and conversations',
      'player.close': 'Close',
      'player.open': 'Open on YouTube',
      'footer.slogan': "You're not here by chance."
    }
  };

  var NEW_DAYS = 14;
  var currentLang = 'fr';

  function locale(lang) { return lang === 'en' ? 'en-US' : 'fr-FR'; }

  function formatCompact(n, lang) {
    try {
      return new Intl.NumberFormat(locale(lang), { notation: 'compact', maximumFractionDigits: n >= 100000 && n < 1000000 ? 0 : 1 }).format(n);
    } catch (e) { return String(n); }
  }

  function formatDate(iso, lang) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    try {
      return new Intl.DateTimeFormat(locale(lang), { day: 'numeric', month: 'short', year: 'numeric' }).format(d);
    } catch (e) { return d.toDateString(); }
  }

  /* Découpe le titre du hero en mots pour la révélation en cascade */
  function wrapWords(el) {
    var text = el.textContent.trim();
    el.innerHTML = '';
    text.split(/\s+/).forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.style.setProperty('--i', String(i));
      span.textContent = word;
      el.appendChild(span);
      el.appendChild(document.createTextNode(' '));
    });
  }

  function localizeData(lang) {
    var dict = translations[lang];
    document.querySelectorAll('[data-date]').forEach(function (el) {
      var txt = formatDate(el.getAttribute('data-date'), lang);
      if (txt) el.textContent = txt;
    });
    document.querySelectorAll('[data-views]').forEach(function (el) {
      el.textContent = formatCompact(Number(el.getAttribute('data-views')), lang) + ' ' + dict['videos.views'];
    });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (!el.classList.contains('is-counting')) {
        el.textContent = formatCompact(Number(el.getAttribute('data-count')), lang);
      }
    });
  }

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.fr;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = dict['meta.title'];
    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.setAttribute('aria-label', dict['lang.label']);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-label');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });
    var more = document.querySelector('.video-more');
    if (more && more.getAttribute('aria-expanded') === 'true') more.textContent = dict['videos.less'];
    var titleLine = document.querySelector('.title-line');
    if (titleLine) wrapWords(titleLine);
    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-lang-option') === lang);
    });
    localizeData(lang);
    try { localStorage.setItem('mbg-lang', lang); } catch (e) { /* stockage indisponible */ }
  }

  function initialLang() {
    try {
      var stored = localStorage.getItem('mbg-lang');
      if (stored === 'fr' || stored === 'en') return stored;
    } catch (e) { /* stockage indisponible */ }
    return 'fr';
  }

  function initToggle() {
    var btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (event) {
      var option = event.target.closest('[data-lang-option]');
      var next = option
        ? option.getAttribute('data-lang-option')
        : (document.documentElement.lang === 'fr' ? 'en' : 'fr');
      applyLanguage(next);
    });
  }

  function initHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.site-nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (link && entry.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  function initParticles() {
    var container = document.querySelector('.particles');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < 14; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      var angle = Math.random() * Math.PI * 2;
      var rStart = 150 + Math.random() * 45;
      var cx = container.offsetWidth / 2;
      var cy = container.offsetHeight / 2;
      var sx = cx + Math.cos(angle) * rStart;
      var sy = cy + Math.sin(angle) * rStart;
      p.style.left = sx + 'px';
      p.style.top = sy + 'px';
      p.style.setProperty('--dx', (cx - sx) * 0.85 + 'px');
      p.style.setProperty('--dy', (cy - sy) * 0.85 + 'px');
      p.style.animationDelay = (Math.random() * 9) + 's';
      container.appendChild(p);
    }
  }

  /* Compteurs animés des statistiques */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var target = Number(el.getAttribute('data-count'));
        var start = null;
        el.classList.add('is-counting');
        var step = function (ts) {
          if (!start) start = ts;
          var t = Math.min((ts - start) / 1600, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = formatCompact(Math.round(target * eased), currentLang);
          if (t < 1) requestAnimationFrame(step);
          else { el.classList.remove('is-counting'); el.textContent = formatCompact(target, currentLang); }
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* Bouton « voir toutes les vidéos » */
  function initVideoMore() {
    var more = document.querySelector('.video-more');
    var extras = document.querySelectorAll('.video-card[data-extra]');
    if (more && extras.length) {
      extras.forEach(function (c) { c.classList.add('is-collapsed'); });
      more.hidden = false;
      more.setAttribute('aria-expanded', 'false');
      more.addEventListener('click', function () {
        var open = more.getAttribute('aria-expanded') !== 'true';
        extras.forEach(function (c) {
          c.classList.toggle('is-collapsed', !open);
          c.style.opacity = '1';
          c.style.transform = 'none';
        });
        more.setAttribute('aria-expanded', open ? 'true' : 'false');
        more.textContent = translations[currentLang][open ? 'videos.less' : 'videos.more'];
      });
    }
  }

  /* Badge « Nouveau » pour les publications récentes (calculé à l'affichage) */
  function initNewBadges() {
    var now = Date.now();
    document.querySelectorAll('.video-card[data-published]').forEach(function (card) {
      var t = Date.parse(card.getAttribute('data-published'));
      var badge = card.querySelector('.video-new');
      if (badge && !isNaN(t) && now - t < NEW_DAYS * 86400000) badge.hidden = false;
    });
  }

  /* Lecteur intégré (youtube-nocookie) dans une modale */
  function initPlayer() {
    var dialog = document.getElementById('player');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var frame = dialog.querySelector('.player-frame');
    var link = dialog.querySelector('.player-link');

    function close() {
      if (dialog.open) dialog.close();
    }

    dialog.addEventListener('close', function () { frame.innerHTML = ''; });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });
    dialog.querySelector('.player-close').addEventListener('click', close);

    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-video-id]');
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      var id = a.getAttribute('data-video-id');
      var isShort = a.getAttribute('data-video-type') === 'short';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&modestbranding=1&hl=' + currentLang;
      iframe.title = (a.querySelector('.video-title, .hero-latest-title, h3') || a).textContent.trim();
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      frame.innerHTML = '';
      frame.appendChild(iframe);
      link.href = a.href;
      dialog.classList.toggle('is-short', isShort);
      dialog.showModal();
    });
  }

  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations: translations, initialLang: initialLang };
  } else {
    document.documentElement.classList.add('js');
    applyLanguage(initialLang());
    initToggle();
    initHeader();
    initReveal();
    initParticles();
    initCounters();
    initVideoMore();
    initNewBadges();
    initPlayer();
    initYear();
  }
})();
