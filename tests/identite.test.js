import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getPersona, getSuggestions } from '../public/js/persona.js';
import { getResponse } from '../public/js/brain.js';

// Tests d'identité ArtBot — critères SPEC 1 à 5.
// Rouge tant que persona.js / getResponse ne sont pas implémentés (TDD volontaire).

function lireNom(persona) {
  return persona.nom ?? persona.name ?? persona.titre ?? persona.title;
}

function lireEmoji(persona) {
  return persona.emoji ?? persona.icone ?? persona.icon;
}

function lireAccueil(persona) {
  return (
    persona.messageAccueil ??
    persona.accueil ??
    persona.message ??
    persona.greeting ??
    persona.welcome ??
    persona.bienvenue
  );
}

function lireSuggestionsPersona(persona) {
  return persona.suggestions ?? persona.questions ?? persona.suggestionsQuestions ?? persona.exemples;
}

describe('ArtBot — identité (critères 1 à 4)', () => {
  it('C1 — getPersona retourne un objet dont le nom est ArtBot', () => {
    const persona = getPersona();
    assert.equal(typeof persona, 'object');
    assert.strictEqual(lireNom(persona), 'ArtBot');
  });

  it('C2 — getPersona expose exactement un emoji d’identité', () => {
    const persona = getPersona();
    const emoji = lireEmoji(persona);
    assert.equal(typeof emoji, 'string');
    assert.strictEqual(emoji, '🎨');
    assert.strictEqual(Array.from(emoji).length, 1);
  });

  it("C3 — getPersona expose un message d'accueil contenant ArtBot", () => {
    const persona = getPersona();
    const accueil = lireAccueil(persona);
    assert.equal(typeof accueil, 'string');
    assert.ok(accueil.includes('ArtBot'));
  });

  it('C4 — getSuggestions retourne exactement trois suggestions', () => {
    const suggestions = getSuggestions();
    assert.ok(Array.isArray(suggestions));
    assert.strictEqual(suggestions.length, 3);
    for (const s of suggestions) {
      assert.equal(typeof s, 'string');
      assert.ok(s.trim().length > 0);
    }
  });

  it('C4 — les trois suggestions sont liées aux musées et aux œuvres d’art', () => {
    const suggestions = getSuggestions();
    assert.strictEqual(suggestions.length, 3);
    for (const s of suggestions) {
      assert.match(s.toLowerCase(), /musée|musee|œuvre|oeuvre|art|louvre|paris|goût|gout/);
    }
  });

  it('C4 — getPersona expose les mêmes trois suggestions que getSuggestions', () => {
    const persona = getPersona();
    assert.deepEqual(lireSuggestionsPersona(persona), getSuggestions());
  });
});

describe('ArtBot — réponse signée (critère 5)', () => {
  it('C5 — la réponse à une question musées/œuvres d’art contient ArtBot', () => {
    const reponse = getResponse('Quels sont les meilleurs musées à Paris ?');
    assert.equal(typeof reponse, 'string');
    assert.ok(reponse.includes('ArtBot'));
  });
});
