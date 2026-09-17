import test from 'node:test';
import assert from 'node:assert/strict';
import { askIA } from '../server/ia.js';
import { createApp } from '../server/app.js';

test('askIA — réponse du fournisseur d’IA', async () => {
  const mockProvider = async (question) => {
    return { ok: true, text: `[ArtBot 🎨] Information sur ${question}` };
  };

  const res = await askIA('Quels sont les musées de Paris ?', { provider: mockProvider });
  assert.equal(res.ok, true);
  assert.equal(res.source, 'ia');
  assert.match(res.text, /ArtBot 🎨/);
});

test('askIA — repli sur les règles en cas d’erreur du fournisseur', async () => {
  const mockFailingProvider = async () => {
    throw new Error('Passerelle IA indisponible');
  };

  const res = await askIA('salut', { provider: mockFailingProvider });
  assert.equal(res.ok, true);
  assert.equal(res.source, 'regles');
  assert.equal(typeof res.text, 'string');
  assert.ok(res.text.length > 0);
});

test('askIA — repli sur les règles en cas de délai dépassé (timeout)', async () => {
  const mockSlowProvider = () => new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true, text: 'Réponse lente' }), 5000);
  });

  const res = await askIA('bonjour', { provider: mockSlowProvider, timeoutMs: 100 });
  assert.equal(res.ok, true);
  assert.equal(res.source, 'regles');
  assert.equal(typeof res.text, 'string');
});

test('askIA — refuse un message vide ou composé d’espaces', async () => {
  const res = await askIA('   ');
  assert.equal(res.ok, false);
  assert.equal(typeof res.error, 'string');
});

test('POST /api/chat — route serveur local sans clé retourne mode règles', async () => {
  const server = createApp({ publicDir: './public' });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'salut' }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.ok, true);
    assert.equal(data.source, 'regles');
    assert.equal(typeof data.text, 'string');
  } finally {
    server.close();
  }
});
