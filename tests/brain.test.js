import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

describe('validateMessage', () => {
  it('refuse une chaîne vide', () => {
    const res = validateMessage('   ');
    assert.equal(res.ok, false);
    assert.ok(typeof res.error === 'string');
  });

  it('nettoie les espaces autour de la chaîne', () => {
    const res = validateMessage('  salut  ');
    assert.deepEqual(res, { ok: true, value: 'salut' });
  });

  it('accepte 280 caractères et refuse 281 caractères', () => {
    const pass = validateMessage('a'.repeat(280));
    assert.equal(pass.ok, true);
    assert.equal(pass.value, 'a'.repeat(280));

    const fail = validateMessage('a'.repeat(281));
    assert.equal(fail.ok, false);
  });
});

describe('replyTo - Guide des musées & Catégories', () => {
  it('répond à la commande /compte avec le nombre de messages', () => {
    const rep = replyTo('/compte', 4);
    assert.ok(rep.includes('5'));
  });

  it('répond à la commande /aide avec la liste des thèmes, catégories et commandes', () => {
    const rep = replyTo('/aide');
    assert.ok(rep.includes('/compte'));
    assert.ok(rep.includes('Guerre'));
    assert.ok(rep.includes('Louvre'));
  });

  it('bascule en anglais avec /lang en et répond en anglais', () => {
    assert.ok(replyTo('/lang en').includes('English'));
    assert.ok(replyTo('louvre', 0, 'en').includes('Louvre Museum'));
    assert.ok(replyTo('war', 0, 'en').includes("Musée de l'Armée"));
    assert.ok(replyTo('/compte', 2, 'en').includes('Total messages'));
    assert.ok(replyTo('/lang fr').includes('français'));
  });

  it('répond aux questions par catégories (guerre, antiquités, impressionnisme, art moderne)', () => {
    assert.ok(replyTo('Quels sont les musées de guerre ?').includes("l'Armée"));
    assert.ok(replyTo('Où voir des antiquités ?').includes('Louvre'));
    assert.ok(replyTo('Je veux voir des tableaux impressionnistes').includes('Orsay'));
    assert.ok(replyTo('Où trouver de l art moderne ?').includes('Pompidou'));
  });

  it('répond aux requêtes sur les musées spécifiques (Louvre, Rodin, Cluny, Dalí)', () => {
    assert.ok(replyTo('Quels sont les horaires du louvre ?').includes('Louvre'));
    assert.ok(replyTo('Où voir Le Penseur de Rodin ?').includes('Rodin'));
    assert.ok(replyTo('Où se trouve La Dame à la licorne ?').includes('Cluny'));
    assert.ok(replyTo('Que voir au musée Dali ?').includes('Dalí'));
  });

  it('donne la même réponse quelle que soit la casse pour les salutations', () => {
    assert.equal(replyTo('SALUT'), replyTo('salut'));
    assert.equal(replyTo('Bonjour'), replyTo('bonjour'));
  });

  it('renvoie une réponse de repli pour une phrase inconnue, différente de aide', () => {
    const reponseInconnue = replyTo('phrase completement inconnue xyz');
    const reponseAide = replyTo('/aide');
    assert.ok(typeof reponseInconnue === 'string' && reponseInconnue.length > 0);
    assert.notEqual(reponseInconnue, reponseAide);
  });
});
