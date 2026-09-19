import { validateMessage, replyTo } from '../public/js/brain.js';

export async function askIA(rawMessage, options = {}) {
  const validation = validateMessage(rawMessage);
  if (!validation.ok) {
    return validation;
  }

  const message = validation.value;
  const timeoutMs = options.timeoutMs ?? 4900;
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
    return { ok: false };
  }

  let cleanUrl = url.trim();
  while (cleanUrl.endsWith('/')) {
    cleanUrl = cleanUrl.slice(0, -1);
  }

  let endpoint = cleanUrl;
  if (!cleanUrl.endsWith('/chat/completions')) {
    if (cleanUrl.endsWith('/v1')) {
      endpoint = `${cleanUrl}/chat/completions`;
    } else {
      endpoint = `${cleanUrl}/v1/chat/completions`;
    }
  }

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
      console.error(`[ArtBot IA Error] HTTP ${response.status}: ${response.statusText}`);
      return { ok: false };
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      console.error('[ArtBot IA Error] Réponse JSON sans choices[0].message.content:', data);
      return { ok: false };
    }

    console.log('[ArtBot IA Success] Réponse reçue de l’IA:', text);
    return { ok: true, text };
  } catch (err) {
    console.error('[ArtBot IA Error] Fetch exception:', err?.message || err);
    return { ok: false };
  }
}
