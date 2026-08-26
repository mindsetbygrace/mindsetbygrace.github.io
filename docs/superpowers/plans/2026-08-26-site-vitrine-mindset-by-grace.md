# Site vitrine « Mindset by Grace » — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire le site vitrine one-page statique et bilingue FR/EN de la coach Grace (Mindset by Grace).

**Architecture:** Une page HTML sémantique (5 sections), un fichier CSS (tokens, layout, animations), un fichier JS vanilla (bascule FR/EN par dictionnaires + révélations au scroll + particules). Zéro dépendance, zéro build.

**Tech Stack:** HTML5, CSS3 (variables custom, grid, keyframes), JavaScript ES2019 vanilla, Google Fonts (Fraunces + Outfit), Node.js uniquement pour les tests (`node:test`).

**Spec :** `docs/superpowers/specs/2026-08-26-site-vitrine-mindset-by-grace-design.md`

**Notes importantes pour l'ingénieur :**
- Le workspace est `C:\Users\hp\Desktop\grace`. Git est déjà initialisé.
- Les images existent déjà : `assets/channels4_profile.jpg` (160×160 — petite, ne pas l'afficher au-delà de ~240px sous peine de flou) et `assets/channels4_banner.jpg` (1707×282).
- Windows / PowerShell : les commandes sont données en pwsh.
- Le contenu FR par défaut est écrit directement dans le HTML (la page fonctionne sans JS) ; le JS applique les dictionnaires.
- Sélecteurs CSS : attention aux spécificités qui s'annulent (ex. padding de `section` vs `.hero`) — toujours vérifier le rendu après chaque tâche.

---

### Task 1: Squelette HTML complet (structure + contenu FR par défaut)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Créer `index.html` avec ce contenu exact**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mindset by Grace — Vous n'êtes pas ici par hasard</title>
  <meta name="description" content="Grace, coach en développement personnel. Cessez de courir après le respect et les opportunités — apprenez à les attirer grâce au Winner's Mindset.">
  <meta property="og:title" content="Mindset by Grace">
  <meta property="og:description" content="You're not here by chance. Attirez le respect et les opportunités grâce au Winner's Mindset.">
  <meta property="og:image" content="assets/channels4_banner.jpg">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Outfit:wght@300..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <header class="site-header">
    <span class="brand">Mindset by Grace</span>
    <button class="lang-toggle" id="lang-toggle" type="button" aria-label="Changer de langue">
      <span data-lang-option="fr">FR</span>
      <span class="lang-sep" aria-hidden="true">/</span>
      <span data-lang-option="en">EN</span>
    </button>
  </header>

  <main>

    <section class="hero" id="hero">
      <div class="hero-text">
        <p class="eyebrow" data-i18n="hero.eyebrow">Coach en développement personnel</p>
        <h1>
          <span data-i18n="hero.title">Vous n'êtes pas ici par hasard.</span>
          <em class="impossible" data-i18n="hero.impossible">Impossible.</em>
        </h1>
        <p class="hero-sub" data-i18n="hero.subtitle">Je suis Grace. J'aide celles et ceux qui sont prêts à cesser de courir après le respect et les opportunités — et à les attirer, grâce au Winner's Mindset.</p>
        <a class="btn btn-primary" href="#about" data-i18n="hero.cta">Découvrir Grace</a>
      </div>
      <div class="hero-portrait">
        <div class="halo" aria-hidden="true"></div>
        <div class="particles" aria-hidden="true"></div>
        <img class="portrait" src="assets/channels4_profile.jpg" alt="Portrait de Grace" width="160" height="160">
      </div>
    </section>

    <section class="about reveal" id="about">
      <div class="section-inner">
        <div class="about-text">
          <p class="eyebrow" data-i18n="about.eyebrow">À propos</p>
          <h2 data-i18n="about.title">Qui est Grace ?</h2>
          <p data-i18n="about.p1">Grace est une créatrice de contenu en développement personnel, active depuis 2024. À travers sa chaîne Mindset by Grace, elle partage un message simple et puissant : rien de ce que vous vivez n'est arrivé par hasard.</p>
          <p data-i18n="about.p2">Sa mission : vous aider à devenir la meilleure version de vous-même et à adopter un mindset de gagnant — un développement personnel intentionnel, sans raccourcis ni formules magiques.</p>
          <blockquote class="quote" data-i18n="about.quote">« Le respect et les opportunités ne se poursuivent pas. Ils s'attirent. »</blockquote>
        </div>
        <figure class="about-banner">
          <img src="assets/channels4_banner.jpg" alt="Bannière de la chaîne YouTube Mindset by Grace" width="1707" height="282">
        </figure>
      </div>
    </section>

    <section class="pillars reveal" id="pillars">
      <div class="section-inner">
        <p class="eyebrow" data-i18n="pillars.eyebrow">Le Winner's Mindset</p>
        <h2 data-i18n="pillars.title">Trois piliers pour tout changer</h2>
        <div class="pillar-grid">
          <article class="pillar-card">
            <span class="pillar-icon" aria-hidden="true">🧠</span>
            <h3 data-i18n="pillars.p1.title">Mindset de gagnant</h3>
            <p data-i18n="pillars.p1.text">Devenir la meilleure version de soi-même commence par une décision : penser, agir et se tenir comme quelqu'un qui a déjà gagné.</p>
          </article>
          <article class="pillar-card">
            <span class="pillar-icon" aria-hidden="true">🧘</span>
            <h3 data-i18n="pillars.p2.title">Le pouvoir du calme</h3>
            <p data-i18n="pillars.p2.text">Que vous soyez en colère, malheureux ou très heureux, gardez votre calme. La maîtrise de soi est la vraie force.</p>
          </article>
          <article class="pillar-card">
            <span class="pillar-icon" aria-hidden="true">🧲</span>
            <h3 data-i18n="pillars.p3.title">Attirer au lieu de poursuivre</h3>
            <p data-i18n="pillars.p3.text">Cessez de courir après le respect et les opportunités. Travaillez sur vous, élevez votre standard — et laissez-les venir à vous.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="social reveal" id="social">
      <div class="section-inner">
        <h2 data-i18n="social.title">Retrouvez Grace</h2>
        <p class="social-subtitle" data-i18n="social.subtitle">Chaque semaine, du contenu intentionnel pour nourrir votre mindset.</p>
        <div class="social-buttons">
          <a class="btn btn-social" href="https://www.youtube.com/@MindsetbyGrace" target="_blank" rel="noopener">YouTube</a>
          <a class="btn btn-social" href="https://www.tiktok.com/@mindsetbygrace__" target="_blank" rel="noopener">TikTok</a>
          <a class="btn btn-social" href="https://www.facebook.com/people/Mindset-by-Grace/61588435420800/" target="_blank" rel="noopener">Facebook</a>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <p>© Mindset by Grace — <span id="year">2026</span></p>
    <p class="footer-slogan" data-i18n="footer.slogan">You're not here by chance.</p>
  </footer>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Vérifier la structure**

Run: `node -e "const h=require('fs').readFileSync('index.html','utf8'); for (const id of ['hero','about','pillars','social','lang-toggle','year']) { if (!h.includes(id)) throw new Error('manquant: '+id); } console.log('OK — structure complète');"`
Expected: `OK — structure complète`

- [ ] **Step 3: Commit**

```pwsh
git add index.html
git commit -m "feat: squelette HTML du site vitrine (5 sections, contenu FR)"
```

---

### Task 2: CSS — tokens, base, header

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Créer `css/styles.css`**

```css
/* ============ Tokens ============ */
:root {
  --minuit: #0B0712;
  --encre: #171126;
  --electrique: #5B7CFF;
  --or: #E3B45C;
  --brume: #B9B3C8;
  --blanc: #F5F3F7;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Outfit", system-ui, sans-serif;
  --radius: 18px;
  --max-width: 1100px;
}

/* ============ Reset & base ============ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--minuit);
  color: var(--brume);
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

img { max-width: 100%; display: block; }

h1, h2, h3 {
  font-family: var(--font-display);
  color: var(--blanc);
  font-weight: 480;
  line-height: 1.12;
}

:focus-visible {
  outline: 2px solid var(--electrique);
  outline-offset: 3px;
  border-radius: 4px;
}

.eyebrow {
  font-size: 0.8125rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--or);
  margin-bottom: 1rem;
}

section { padding: 6rem 1.5rem; }

.section-inner { max-width: var(--max-width); margin: 0 auto; }

/* ============ Header fixe ============ */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1.5rem;
  background: rgba(11, 7, 18, 0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(91, 124, 255, 0.12);
}

.brand {
  font-family: var(--font-display);
  color: var(--blanc);
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}

.lang-toggle {
  display: flex;
  gap: 0.45rem;
  background: transparent;
  border: 1px solid rgba(91, 124, 255, 0.35);
  color: var(--brume);
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition: border-color 0.25s;
}

.lang-toggle:hover { border-color: var(--electrique); }

.lang-toggle [data-lang-option] { transition: color 0.25s; }

.lang-toggle .is-active { color: var(--blanc); font-weight: 600; }
```

- [ ] **Step 2: Vérifier l'existence du fichier**

Run: `node -e "require('fs').accessSync('css/styles.css'); console.log('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```pwsh
git add css/styles.css
git commit -m "feat: tokens de design, base CSS et header fixe"
```

---

### Task 3: CSS — section Hero (halo, portrait, boutons)

**Files:**
- Modify: `css/styles.css` (ajouter à la fin du fichier)

- [ ] **Step 1: Ajouter ce bloc à la fin de `css/styles.css`**

```css
/* ============ Hero ============ */
.hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 3rem;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 7rem;
}

.hero-text h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: 1.5rem;
}

.hero-text h1 .impossible {
  display: block;
  font-style: italic;
  color: var(--electrique);
}

.hero-sub {
  max-width: 34rem;
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
}

.btn {
  display: inline-block;
  padding: 0.85rem 1.9rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition: transform 0.25s, box-shadow 0.25s, background-color 0.25s, color 0.25s;
}

.btn-primary {
  background: var(--electrique);
  color: var(--minuit);
  font-weight: 600;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(91, 124, 255, 0.35);
}

/* Portrait + halo (élément signature : l'attraction) */
.hero-portrait {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
}

.halo {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(91, 124, 255, 0.35) 0%,
    rgba(227, 180, 92, 0.12) 45%,
    transparent 70%);
  filter: blur(6px);
  animation: halo-pulse 6s ease-in-out infinite;
}

@keyframes halo-pulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.12); opacity: 1; }
}

.portrait {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(227, 180, 92, 0.5);
  box-shadow: 0 0 60px rgba(91, 124, 255, 0.25);
}

.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--or);
  opacity: 0;
  animation: drift 9s linear infinite;
}

@keyframes drift {
  0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
  15% { opacity: 0.9; }
  85% { opacity: 0.5; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1); }
}
```

- [ ] **Step 2: Ouvrir `index.html` dans le navigateur et vérifier**

Le hero s'affiche : titre à gauche, photo ronde avec halo pulsant à droite, header fixe visible. La photo ne doit pas être floue (240px max).

- [ ] **Step 3: Commit**

```pwsh
git add css/styles.css
git commit -m "feat: section hero — halo signature, portrait, boutons"
```

---

### Task 4: CSS — sections About, Pillars, Social, Footer

**Files:**
- Modify: `css/styles.css` (ajouter à la fin du fichier)

- [ ] **Step 1: Ajouter ce bloc à la fin de `css/styles.css`**

```css
/* ============ À propos ============ */
.about .section-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.about h2, .pillars h2, .social h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1.5rem;
}

.about-text p { margin-bottom: 1.1rem; }

.quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.35rem;
  color: var(--blanc);
  border-left: 2px solid var(--or);
  padding-left: 1.25rem;
  margin-top: 2rem;
}

.about-banner img {
  border-radius: var(--radius);
  border: 1px solid rgba(91, 124, 255, 0.18);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

/* ============ Piliers ============ */
.pillars { text-align: center; }

.pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  text-align: left;
}

.pillar-card {
  background: var(--encre);
  border: 1px solid rgba(91, 124, 255, 0.14);
  border-radius: var(--radius);
  padding: 2.2rem 1.8rem;
  transition: transform 0.3s, border-color 0.3s;
}

.pillar-card:hover {
  transform: translateY(-6px);
  border-color: rgba(91, 124, 255, 0.45);
}

.pillar-icon {
  font-size: 1.9rem;
  display: inline-block;
  margin-bottom: 1.1rem;
}

.pillar-card h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
}

/* ============ Réseaux sociaux ============ */
.social { text-align: center; }

.social-subtitle { margin-bottom: 2.5rem; }

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-social {
  border: 1px solid rgba(91, 124, 255, 0.4);
  color: var(--blanc);
}

.btn-social:hover {
  background: var(--electrique);
  color: var(--minuit);
  transform: translateY(-2px);
}

/* ============ Footer ============ */
.site-footer {
  border-top: 1px solid rgba(91, 124, 255, 0.12);
  padding: 2.5rem 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.footer-slogan {
  font-family: var(--font-display);
  font-style: italic;
  color: var(--electrique);
  margin-top: 0.5rem;
}

/* ============ Révélations au scroll ============ */
/* Le préfixe .js garantit que le contenu reste visible si le JS est désactivé */
.js .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.js .reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ============ Séquence d'entrée du hero ============ */
.hero-text > *, .hero-portrait {
  opacity: 0;
  transform: translateY(18px);
  animation: rise 0.9s ease forwards;
}

.hero-text > *:nth-child(1) { animation-delay: 0.1s; }
.hero-text > *:nth-child(2) { animation-delay: 0.25s; }
.hero-text > *:nth-child(3) { animation-delay: 0.4s; }
.hero-text > *:nth-child(4) { animation-delay: 0.55s; }
.hero-portrait { animation-delay: 0.35s; }

@keyframes rise {
  to { opacity: 1; transform: none; }
}

/* ============ Responsive ============ */
@media (max-width: 860px) {
  section { padding: 4rem 1.25rem; }

  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding-top: 6rem;
    min-height: auto;
  }

  .hero-portrait { order: -1; min-height: 280px; }

  .hero-sub { margin-inline: auto; }

  .about .section-inner { grid-template-columns: 1fr; }

  .pillar-grid { grid-template-columns: 1fr; }
}

/* ============ Animations réduites ============ */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reveal, .hero-text > *, .hero-portrait {
    opacity: 1;
    transform: none;
  }
}
```

> Note : les sélecteurs `.js .reveal` ci-dessus ne s'appliquent que lorsque `js/main.js` a ajouté la classe `js` sur `<html>` (voir Task 5) — sans JavaScript, les sections restent visibles.

- [ ] **Step 2: Vérifier dans le navigateur**

Toutes les sections sont stylées ; en largeur < 860px le hero s'empile (photo en premier) ; les cartes piliers sont sur une colonne en mobile.

- [ ] **Step 3: Commit**

```pwsh
git add css/styles.css
git commit -m "feat: styles des sections about, piliers, social, footer + responsive"
```

---

### Task 5: Internationalisation FR/EN (TDD)

**Files:**
- Create: `tests/i18n.test.cjs`
- Create: `js/main.js`

- [ ] **Step 1: Écrire les tests (ils doivent échouer)**

Créer `tests/i18n.test.cjs` :

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { translations } = require('../js/main.js');

test('FR et EN ont exactement les mêmes clés', () => {
  const fr = Object.keys(translations.fr).sort();
  const en = Object.keys(translations.en).sort();
  assert.deepEqual(en, fr);
});

test('aucune valeur vide', () => {
  for (const lang of ['fr', 'en']) {
    for (const [key, value] of Object.entries(translations[lang])) {
      assert.ok(typeof value === 'string' && value.trim().length > 0, `${lang}.${key} est vide`);
    }
  }
});

test('toutes les clés data-i18n du HTML existent dans les deux dictionnaires', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  assert.ok(keys.length >= 15, 'trop peu de clés data-i18n trouvées');
  for (const key of keys) {
    assert.ok(key in translations.fr, `clé manquante en FR : ${key}`);
    assert.ok(key in translations.en, `clé manquante en EN : ${key}`);
  }
});
```

- [ ] **Step 2: Lancer les tests — vérifier l'échec**

Run: `node --test tests/`
Expected: FAIL — `Cannot find module '../js/main.js'`

- [ ] **Step 3: Créer `js/main.js` avec ce contenu exact**

```js
/* Mindset by Grace — bascule FR/EN, révélations au scroll, particules */
(function () {
  'use strict';

  var translations = {
    fr: {
      'meta.title': "Mindset by Grace — Vous n'êtes pas ici par hasard",
      'lang.label': 'Changer de langue',
      'hero.eyebrow': 'Coach en développement personnel',
      'hero.title': "Vous n'êtes pas ici par hasard.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "Je suis Grace. J'aide celles et ceux qui sont prêts à cesser de courir après le respect et les opportunités — et à les attirer, grâce au Winner's Mindset.",
      'hero.cta': 'Découvrir Grace',
      'about.eyebrow': 'À propos',
      'about.title': 'Qui est Grace ?',
      'about.p1': "Grace est une créatrice de contenu en développement personnel, active depuis 2024. À travers sa chaîne Mindset by Grace, elle partage un message simple et puissant : rien de ce que vous vivez n'est arrivé par hasard.",
      'about.p2': "Sa mission : vous aider à devenir la meilleure version de vous-même et à adopter un mindset de gagnant — un développement personnel intentionnel, sans raccourcis ni formules magiques.",
      'about.quote': '« Le respect et les opportunités ne se poursuivent pas. Ils s\'attirent. »',
      'pillars.eyebrow': "Le Winner's Mindset",
      'pillars.title': 'Trois piliers pour tout changer',
      'pillars.p1.title': 'Mindset de gagnant',
      'pillars.p1.text': "Devenir la meilleure version de soi-même commence par une décision : penser, agir et se tenir comme quelqu'un qui a déjà gagné.",
      'pillars.p2.title': 'Le pouvoir du calme',
      'pillars.p2.text': 'Que vous soyez en colère, malheureux ou très heureux, gardez votre calme. La maîtrise de soi est la vraie force.',
      'pillars.p3.title': 'Attirer au lieu de poursuivre',
      'pillars.p3.text': 'Cessez de courir après le respect et les opportunités. Travaillez sur vous, élevez votre standard — et laissez-les venir à vous.',
      'social.title': 'Retrouvez Grace',
      'social.subtitle': 'Chaque semaine, du contenu intentionnel pour nourrir votre mindset.',
      'footer.slogan': "You're not here by chance."
    },
    en: {
      'meta.title': "Mindset by Grace — You're not here by chance",
      'lang.label': 'Switch language',
      'hero.eyebrow': 'Personal development coach',
      'hero.title': "You're not here by chance.",
      'hero.impossible': 'Impossible.',
      'hero.subtitle': "I'm Grace. I help those who are ready to stop chasing respect and opportunities — and start attracting them instead, through the Winner's Mindset.",
      'hero.cta': 'Discover Grace',
      'about.eyebrow': 'About',
      'about.title': 'Who is Grace?',
      'about.p1': 'Grace is a personal development content creator, active since 2024. Through her channel Mindset by Grace, she shares one simple, powerful message: nothing you are going through happened by chance.',
      'about.p2': "Her mission: help you become the best version of yourself and adopt a winner's mindset — intentional personal development, with no shortcuts and no magic formulas.",
      'about.quote': '"Respect and opportunities are not chased. They are attracted."',
      'pillars.eyebrow': "The Winner's Mindset",
      'pillars.title': 'Three pillars that change everything',
      'pillars.p1.title': "Winner's mindset",
      'pillars.p1.text': 'Becoming the best version of yourself starts with one decision: think, act and carry yourself like someone who has already won.',
      'pillars.p2.title': 'The power of calm',
      'pillars.p2.text': 'Whether you are angry, unhappy or overjoyed — stay calm. Self-mastery is the real strength.',
      'pillars.p3.title': 'Attract instead of chase',
      'pillars.p3.text': 'Stop chasing respect and opportunities. Work on yourself, raise your standard — and let them come to you.',
      'social.title': 'Follow Grace',
      'social.subtitle': 'Every week, intentional content to feed your mindset.',
      'footer.slogan': "You're not here by chance."
    }
  };

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
```

- [ ] **Step 4: Lancer les tests — vérifier le succès**

Run: `node --test tests/`
Expected: PASS (3 tests)

- [ ] **Step 5: Vérifier dans le navigateur**

Ouvrir `index.html` : le site est en FR ; cliquer sur « EN » → tous les textes passent en anglais (y compris le titre de l'onglet) ; recharger la page → la langue choisie est mémorisée ; `<html lang>` change.

- [ ] **Step 6: Commit**

```pwsh
git add js/main.js tests/i18n.test.cjs
git commit -m "feat: bascule FR/EN avec persistance (TDD)"
```

---

### Task 6: QA finale — accessibilité, liens, finitions

**Files:**
- Modify: tout fichier nécessitant une correction mineure

- [ ] **Step 1: Vérifications manuelles dans le navigateur**

Checklist :
1. Navigation clavier : `Tab` atteint le toggle FR/EN, le CTA et les 3 boutons sociaux ; le focus est visible (contour bleu).
2. Les 3 liens sociaux s'ouvrent dans un nouvel onglet vers les bonnes URLs :
   - https://www.youtube.com/@MindsetbyGrace
   - https://www.tiktok.com/@mindsetbygrace__
   - https://www.facebook.com/people/Mindset-by-Grace/61588435420800/
3. Le CTA « Découvrir Grace » défile vers la section À propos.
4. Avec `prefers-reduced-motion` activé (émulation navigateur) : pas d'animations, tout est visible.
5. En mobile (375px) : rien ne déborde, le header reste lisible.
6. Le halo pulse et les particules dorées dérivent vers la photo (desktop).

- [ ] **Step 2: Relancer les tests**

Run: `node --test tests/`
Expected: PASS (3 tests)

- [ ] **Step 3: Corriger si besoin, puis commit final**

```pwsh
git add -A
git commit -m "chore: QA finale — accessibilité, liens, finitions"
```

(Si aucune correction n'est nécessaire, sauter ce commit.)

---

## Fait lorsque

- `index.html`, `css/styles.css`, `js/main.js`, `tests/i18n.test.cjs` existent et sont commités.
- `node --test tests/` passe.
- Les 5 sections sont rendues, la bascule FR/EN fonctionne avec persistance, les animations respectent `prefers-reduced-motion`.
