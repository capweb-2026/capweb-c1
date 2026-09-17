const PERSONA_NOM = 'ArtBot';
const PERSONA_EMOJI = '🎨';
const PERSONA_ACCUEIL = 'Bonjour, je suis ArtBot 🎨 ! Je peux vous aider à découvrir les musées et les œuvres d’art.';
const PERSONA_SUGGESTIONS = [
  'Quels sont les meilleurs musées à Paris ?',
  'Quels types d’œuvres peut-on voir au Louvre ?',
  'Peux-tu me conseiller un musée selon mes goûts ?'
];

export function renderPersona() {
  const titre = document.querySelector('#persona');
  if (titre) {
    titre.textContent = `${PERSONA_NOM} ${PERSONA_EMOJI}`;
  }
  const accueil = document.querySelector('#accueil');
  if (accueil) {
    accueil.textContent = PERSONA_ACCUEIL;
  }
  const liste = document.querySelector('#suggestions');
  if (liste) {
    const lignes = PERSONA_SUGGESTIONS.map((texte) => {
      const li = document.createElement('li');
      li.textContent = texte;
      return li;
    });
    liste.replaceChildren(...lignes);
  }
}

export function renderMessages(messages, container) {
  if (!container) return;
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const label = msg.role === 'user' ? 'Vous : ' : 'ArtBot : ';
    li.textContent = label + msg.text;
    if (msg.role) {
      li.dataset.role = msg.role;
    }
    return li;
  });
  container.replaceChildren(...lignes);
}
