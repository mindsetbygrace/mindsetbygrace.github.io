const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('toutes les images référencées dans le HTML existent', () => {
  const refs = [...html.matchAll(/src="(assets\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(refs.length >= 3, 'trop peu d\'images référencées');
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `image introuvable : ${ref}`);
  }
});

test('le favicon existe', () => {
  assert.ok(fs.existsSync(path.join(root, 'favicon.svg')), 'favicon.svg introuvable');
  assert.ok(html.includes('href="favicon.svg"'), 'favicon non référencé dans le HTML');
});

test('attributs de performance présents', () => {
  assert.ok(html.includes('loading="lazy"'), 'loading="lazy" manquant sur image hors écran');
  assert.ok(html.includes('fetchpriority="high"'), 'fetchpriority="high" manquant sur le portrait');
  assert.ok(html.includes('rel="preload" as="image"'), 'preload de l\'image hero manquant');
});

test('lien d\'évitement présent', () => {
  assert.ok(html.includes('class="skip-link"'), 'skip link manquant');
});
