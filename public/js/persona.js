const NOM = 'ArtBot';
const EMOJI = '🎨';
const MESSAGE_ACCUEIL = 'Bonjour, je suis ArtBot 🎨 ! Je peux vous aider à découvrir les musées et les œuvres d’art.';

const SUGGESTIONS = [
  'Quels sont les meilleurs musées à Paris ?',
  'Quels types d’œuvres peut-on voir au Louvre ?',
  'Peux-tu me conseiller un musée selon mes goûts ?'
];

export function getPersona() {
  return {
    nom: NOM,
    emoji: EMOJI,
    messageAccueil: MESSAGE_ACCUEIL,
    suggestions: getSuggestions()
  };
}

export function getSuggestions() {
  return [...SUGGESTIONS];
}
