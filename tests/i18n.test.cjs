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
