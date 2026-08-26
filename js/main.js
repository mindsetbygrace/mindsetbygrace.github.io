/* Mindset by Grace — bascule FR/EN, révélations au scroll, particules */
(function () {
  'use strict';

  var translations = {
    fr: {
      'meta.title': "Mindset by Grace — Vous n'êtes pas ici par hasard",
      'lang.label': 'Changer de langue',
      'a11y.skip': 'Aller au contenu',
      'hero.eyebrow': 'Coach en développement personnel',
      'hero.title': "Vous n'êtes pas ici par hasard.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "Je suis Grace. J'aide celles et ceux qui sont prêts à cesser de courir après le respect et les opportunités — et à les attirer par le calme, le charisme et le Winner's Mindset.",
      'hero.cta': 'Découvrir Grace',
      'about.eyebrow': 'À propos',
      'about.title': 'Qui est Grace ?',
      'about.p1': "Grace est une créatrice de contenu en développement personnel, active depuis 2024. À travers Mindset by Grace, elle partage un message simple et puissant : le charisme n'est pas un don de naissance — c'est un état d'esprit qui s'apprend.",
      'about.p2': "Sa mission : vous aider à devenir la meilleure version de vous-même — présence, calme, magnétisme. Plus de 80 000 personnes suivent déjà ses conseils pour développer un mindset de gagnant.",
      'about.quote': "« Le respect et les opportunités ne se poursuivent pas. Ils s'attirent. »",
      'pillars.eyebrow': "Le Winner's Mindset",
      'pillars.title': 'Trois piliers pour devenir magnétique',
      'pillars.p1.title': "Le charisme s'apprend",
      'pillars.p1.text': "Le charisme est un état d'esprit, pas un don de naissance. Penser, agir et se tenir comme une personne charismatique — cela se travaille, chaque jour.",
      'pillars.p2.title': 'Le pouvoir du calme',
      'pillars.p2.text': "L'agitation et l'inconfort tuent le charisme. Que vous soyez en colère ou très heureux, gardez votre calme : la maîtrise de soi est votre plus grande force.",
      'pillars.p3.title': 'Attirer au lieu de poursuivre',
      'pillars.p3.text': 'Cessez de courir après le respect et les opportunités. Élevez votre standard, incarnez votre valeur — et laissez-les venir à vous.',
      'social.title': 'Retrouvez Grace',
      'social.subtitle': 'Chaque semaine, du contenu intentionnel pour nourrir votre charisme et votre mindset.',
      'footer.slogan': "You're not here by chance."
    },
    en: {
      'meta.title': "Mindset by Grace — You're not here by chance",
      'lang.label': 'Switch language',
      'a11y.skip': 'Skip to content',
      'hero.eyebrow': 'Personal development coach',
      'hero.title': "You're not here by chance.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "I'm Grace. I help those who are ready to stop chasing respect and opportunities — and start attracting them instead, through calm, charisma and the Winner's Mindset.",
      'hero.cta': 'Discover Grace',
      'about.eyebrow': 'About',
      'about.title': 'Who is Grace?',
      'about.p1': 'Grace is a personal development content creator, active since 2024. Through Mindset by Grace, she shares one simple, powerful message: charisma is not a gift — it is a mindset that can be learned.',
      'about.p2': "Her mission: help you become the best version of yourself — presence, calm, magnetism. More than 80,000 people already follow her advice to build a winner's mindset.",
      'about.quote': '"Respect and opportunities are not chased. They are attracted."',
      'pillars.eyebrow': "The Winner's Mindset",
      'pillars.title': 'Three pillars to become magnetic',
      'pillars.p1.title': 'Charisma can be learned',
      'pillars.p1.text': 'Charisma is a mindset, not a birthright. Thinking, acting and carrying yourself like a charismatic person — that is something you build, every day.',
      'pillars.p2.title': 'The power of calm',
      'pillars.p2.text': 'Restlessness and discomfort kill charisma. Whether you are angry or overjoyed, stay calm: self-mastery is your greatest strength.',
      'pillars.p3.title': 'Attract instead of chase',
      'pillars.p3.text': 'Stop chasing respect and opportunities. Raise your standard, embody your worth — and let them come to you.',
      'social.title': 'Follow Grace',
      'social.subtitle': 'Every week, intentional content to feed your charisma and your mindset.',
      'footer.slogan': "You're not here by chance."
    }
  };

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

  function applyLanguage(lang) {
    var dict = translations[lang] || translations.fr;
    document.documentElement.lang = lang;
    document.title = dict['meta.title'];
    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.setAttribute('aria-label', dict['lang.label']);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    var titleLine = document.querySelector('.title-line');
    if (titleLine) wrapWords(titleLine);
    document.querySelectorAll('[data-lang-option]').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-lang-option') === lang);
    });
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
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  function initParticles() {
    var container = document.querySelector('.particles');
    if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < 12; i++) {
      var p = document.createElement('span');
      p.className = 'particle';
      var angle = Math.random() * Math.PI * 2;
      var rStart = 140 + Math.random() * 40;
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
    initReveal();
    initParticles();
    initYear();
  }
})();
