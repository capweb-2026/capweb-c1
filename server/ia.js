import { validateMessage, replyTo } from '../public/js/brain.js';

export async function askIA(rawMessage, options = {}) {
  const validation = validateMessage(rawMessage);
  if (!validation.ok) {
    return validation;
  }

  const message = validation.value;
  const timeoutMs = options.timeoutMs ?? 8000;
  const provider = options.provider ?? defaultProvider;

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout IA')), timeoutMs);
    });

    const result = await Promise.race([provider(message), timeoutPromise]);
    if (result && result.ok && result.text) {
      return { ok: true, source: 'ia', text: result.text };
    }
  } catch (_err) {
    // En cas d'erreur ou de timeout, bascule sur les règles locales
  }

  return { ok: true, source: 'regles', text: replyTo(message) };
}

async function defaultProvider(message) {
  const url = (process.env.CAPWEB_IA_URL || '').trim();
  const key = (process.env.CAPWEB_IA_CLE || '').trim();

  if (!url || !key) {
    console.error('[ArtBot IA Error] Variable CAPWEB_IA_URL ou CAPWEB_IA_CLE manquante dans process.env');
    return { ok: false };
  }

  const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const endpoint = cleanUrl.endsWith('/v1') ? `${cleanUrl}/chat/completions` : `${cleanUrl}/v1/chat/completions`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'capweb-ia',
        messages: [
          {
            role: 'system',
            content: 'Tu es ArtBot 🎨, un assistant expert des musées et œuvres d’art. Réponds poliment dans ton thème.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`[ArtBot IA Error] La passerelle a répondu HTTP ${response.status}: ${response.statusText}`);
      return { ok: false };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      console.error('[ArtBot IA Error] Réponse JSON de la passerelle sans message content');
      return { ok: false };
    }

    return { ok: true, text };
  } catch (err) {
    console.error('[ArtBot IA Error] Exception lors de l’appel fetch :', err?.message || err);
    return { ok: false };
  }
}
