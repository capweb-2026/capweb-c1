import { validateMessage, replyTo } from './brain.js';
import { renderMessages, renderPersona } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');
const effacerBtn = document.querySelector('#effacer');

const STORAGE_KEY = 'capweb.historique';
const LANG_KEY = 'capweb.lang';
const historique = [];
let currentLang = localStorage.getItem(LANG_KEY) || 'fr';

function chargerHistorique() {
  const sauvegarde = localStorage.getItem(STORAGE_KEY);
  if (!sauvegarde) return;
  try {
    const donnees = JSON.parse(sauvegarde);
    if (Array.isArray(donnees)) {
      historique.push(...donnees);
      renderMessages(historique, liste);
    } else {
      if (statut) statut.textContent = 'Historique invalide, conversation réinitialisée.';
    }
  } catch {
    if (statut) statut.textContent = 'Erreur lors de la lecture de la mémoire, conversation réinitialisée.';
  }
}

function sauvegarderHistorique() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historique));
    localStorage.setItem(LANG_KEY, currentLang);
  } catch {
    // Ne pas bloquer l'application en cas d'erreur de stockage
  }
}

formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!champ) return;

  const validation = validateMessage(champ.value);
  if (!validation.ok) {
    if (statut) statut.textContent = validation.error;
    champ.focus();
    return;
  }

  const userText = validation.value;
  if (userText === '/effacer') {
    historique.length = 0;
    localStorage.removeItem(STORAGE_KEY);
    renderMessages(historique, liste);
    if (statut) statut.textContent = 'Conversation effacée.';
    champ.value = '';
    champ.focus();
    return;
  }

  if (userText === '/lang en') {
    currentLang = 'en';
  } else if (userText === '/lang fr') {
    currentLang = 'fr';
  }

  const baseReply = replyTo(userText, historique.length, currentLang);
  const botReply = typeof baseReply === 'string' && baseReply.includes('ArtBot') ? baseReply : `${baseReply} — ArtBot`;

  historique.push({ role: 'user', text: userText });
  historique.push({ role: 'assistant', text: botReply });
  sauvegarderHistorique();

  renderMessages(historique, liste);

  champ.value = '';
  if (statut) statut.textContent = '';
  champ.focus();
});

effacerBtn?.addEventListener('click', () => {
  if (confirm('Voulez-vous vraiment effacer la conversation ?')) {
    historique.length = 0;
    localStorage.removeItem(STORAGE_KEY);
    renderMessages(historique, liste);
    if (statut) statut.textContent = 'Conversation effacée.';
  }
});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});

// Chargement initial au démarrage
renderPersona();
chargerHistorique();
