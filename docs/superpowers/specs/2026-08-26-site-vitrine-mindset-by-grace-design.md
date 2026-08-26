# Site vitrine « Mindset by Grace » — Document de design

**Date :** 2026-08-26
**Statut :** Approuvé par le client (brainstorming)
**Type :** Site vitrine one-page statique, bilingue FR/EN

## 1. Contexte

Grace est une coach et créatrice de contenu en développement personnel (Togo), active depuis 2024 sous la marque **Mindset by Grace** :

- YouTube : https://www.youtube.com/@MindsetbyGrace
- TikTok : https://www.tiktok.com/@mindsetbygrace__
- Facebook : https://www.facebook.com/people/Mindset-by-Grace/61588435420800/

Son message central : *« You're not here by chance. Impossible. »* — elle aide celles et ceux qui sont prêts à cesser de **courir après** le respect et les opportunités, pour apprendre à les **attirer** grâce au *Winner's Mindset*. Thèmes récurrents : mindset de gagnant, pouvoir du calme, meilleure version de soi.

### Assets disponibles

- `assets/channels4_profile.jpg` — photo de profil (160×160, fond sombre)
- `assets/channels4_banner.jpg` — bannière YouTube (1707×282, fond noir violacé, accents bleus, texte blanc)

Les textes du site sont rédigés à partir de l'analyse de son profil public (pas de bio fournie).

## 2. Objectifs et hors-périmètre

### Objectifs

1. Présenter Grace, sa mission et son univers en un défilement.
2. Inciter le visiteur à la suivre sur ses réseaux sociaux (unique point de contact).
3. Site bilingue FR/EN avec bascule instantanée.
4. Identité visuelle fidèle à sa bannière : fond sombre, accents bleu électrique, touche d'or.

### Hors-périmètre (YAGNI)

- Pas de système de réservation, de paiement, de formulaire de contact.
- Pas de blog, pas de vente de produits digitaux.
- Pas de backend, pas de base de données, pas de framework.

## 3. Structure de la page (one-page, 5 sections)

1. **Hero** — plein écran, asymétrique.
   - À gauche : eyebrow « Mindset by Grace », titre « Vous n'êtes pas ici par hasard. » suivi de *« Impossible. »* en italique, sous-titre de mission, bouton « Découvrir Grace » (défile vers À propos).
   - À droite : photo de profil ronde avec halo lumineux (élément signature, §4).
   - Sélecteur FR/EN dans un en-tête fin, **fixe au défilement** (reste visible en permanence).
   - Mobile : empilé, photo au-dessus du texte.
2. **À propos de Grace** — texte + bannière YouTube (`channels4_banner.jpg`) en visuel large ; citation mise en avant : *« Le respect et les opportunités ne se poursuivent pas. Ils s'attirent. »*
3. **Le Winner's Mindset — ses piliers** — 3 cartes non numérotées (les piliers ne sont pas une séquence) :
   - 🧠 Mindset de gagnant — devenir la meilleure version de soi-même.
   - 🧘 Le pouvoir du calme — la maîtrise de soi comme force.
   - 🧲 Attirer au lieu de poursuivre — respect & opportunités.
4. **Retrouvez Grace** — boutons YouTube / TikTok / Facebook (liens réels ci-dessus), sans aperçu de bannière (celle-ci est utilisée dans la section À propos).
5. **Footer** — © Mindset by Grace, année courante, rappel du slogan.

## 4. Identité visuelle

Direction : **« Élégance nocturne & lumière attirée »**.

### Palette

| Nom | Hex | Usage |
|---|---|---|
| Minuit | `#0B0712` | Fond principal (noir violacé profond) |
| Encre | `#171126` | Cartes et surfaces |
| Électrique | `#5B7CFF` | Accent primaire : boutons, liens, soulignements |
| Or | `#E3B45C` | Accent secondaire « gagnant », parcimonieux |
| Brume | `#B9B3C8` | Textes secondaires |
| Blanc | `#F5F3F7` | Titres |

### Typographie (Google Fonts)

- **Fraunces** — display (titres), italique pour les phrases clés (*« Impossible. »*). Utilisée avec retenue.
- **Outfit** — corps de texte, labels, boutons.
- Échelle : titres `clamp(2.5rem, 6vw, 4.5rem)` ; corps ~1rem/1.6 ; eyebrows en petites capitales espacées.

### Élément signature : le thème de l'attraction

Derrière la photo de Grace, un halo lumineux doux (dégradé radial bleu/doré) pulse lentement, comme un champ gravitationnel ; de petites particules dorées dérivent vers la photo. Incarnation visuelle du message : *ne plus poursuivre, attirer*. Respecte `prefers-reduced-motion` (statique si activé).

### Mouvements

- Apparition en fondu décalée au chargement (hero).
- Révélations au défilement via IntersectionObserver (sections et cartes).
- Micro-interactions au survol des cartes et boutons.
- Sobre et orchestré : un moment fort (hero), le reste discret.

## 5. Contenus (rédaction FR + EN)

Textes clés (version FR ; la version EN est rédigée en miroir) :

- **Hero** : « Vous n'êtes pas ici par hasard. » / *« Impossible. »* — « Je suis Grace. J'aide celles et ceux qui sont prêts à cesser de courir après le respect et les opportunités — et à les attirer, grâce au Winner's Mindset. »
- **À propos** : parcours de créatrice togolaise de développement personnel intentionnel depuis 2024 ; mission : aider à devenir la meilleure version de soi-même et adopter un mindset de gagnant.
- **Piliers** : les 3 cartes ci-dessus (§3), chacune avec un texte court (2–3 phrases) fidèle à ses thèmes de contenu (calme, maîtrise de soi, attraction).
- **Retrouvez Grace** : « Suivez Mindset by Grace » + boutons réseaux.
- **Footer** : © Mindset by Grace — « You're not here by chance. »

Les textes définitifs sont écrits pendant l'implémentation et validés dans la page.

## 6. Architecture technique

```
grace/
├── index.html          # structure sémantique, attributs data-i18n
├── css/styles.css      # tokens (couleurs, typo), layout, animations
├── js/main.js          # bascule FR/EN, révélations au scroll, particules/halo
└── assets/             # channels4_profile.jpg, channels4_banner.jpg
```

- **Zéro dépendance, zéro build** : HTML/CSS/JS vanilla, Google Fonts via `<link>`.
- **Bilingue** : dictionnaires FR/EN dans `js/main.js` ; attributs `data-i18n` sur les éléments ; bascule instantanée ; choix mémorisé en `localStorage` ; **français par défaut** ; `<html lang>` mis à jour à chaque bascule.
- **Accessibilité (qualité plancher)** : HTML sémantique (header/main/section/footer), responsive mobile-first, focus clavier visible, contrastes suffisants sur fond sombre, `prefers-reduced-motion` respecté, `alt` sur les images.
- **SEO/partage** : `<title>`, meta description, balises Open Graph (titre, description, image = bannière). Les URLs OG sont laissées en relatif pendant le développement et finalisées en absolu au déploiement.

## 7. Déploiement

Hébergement statique gratuit, au choix au moment du lancement : GitHub Pages, Netlify ou Vercel. Aucune contrainte serveur.

## 8. Tests et validation

- Ouverture locale dans le navigateur : rendu des 5 sections, défilement, bascule FR/EN (y compris persistance après rechargement).
- Vérification responsive (desktop + mobile).
- Navigation clavier et animations réduites.
- Vérification des liens sociaux (URLs exactes des profils).
