import { askIA } from '../server/ia.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ pret: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (_e) {
      body = {};
    }
  }

  const message = body?.message || '';
  const result = await askIA(message);
  return res.status(200).json(result);
}
