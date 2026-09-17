# Spécification d'ArtBot

## Identité

- Nom : ArtBot
- Emoji : 🎨
- Thème : musées et œuvres d'art

### Message d'accueil

Bonjour, je suis ArtBot 🎨 ! Je peux vous aider à découvrir les musées et les œuvres d’art.

### Questions suggérées

1. Quels sont les meilleurs musées à Paris ?
2. Quels types d’œuvres peut-on voir au Louvre ?
3. Peux-tu me conseiller un musée selon mes goûts ?

## Objectif

ArtBot est un assistant consacré aux musées et aux œuvres d'art. Il aide l'utilisateur à découvrir des musées, à comprendre les catégories d'œuvres qu'ils présentent et à trouver des recommandations adaptées à ses intérêts.

## Critères d'acceptation

1. Quand le chatbot est chargé, le système affiche le nom `ArtBot`.
2. Quand l'identité du chatbot est affichée, le système affiche exactement un emoji associé à son identité.
3. Quand l'utilisateur ouvre le chatbot, le système affiche un message d'accueil contenant `ArtBot`.
4. Quand l'utilisateur consulte les suggestions, le système affiche exactement trois questions suggérées liées aux musées et aux œuvres d'art.
5. Quand l'utilisateur pose une question correspondant au thème des musées et des œuvres d'art, le système fournit une réponse signée `ArtBot`.
6. Quand la suite de tests CP1 est exécutée, le système conserve un contrat toujours vert.
7. Quand une question est envoyée au serveur via `/api/chat`, la réponse provient de la passerelle d'IA si celle-ci répond en moins de 4 secondes.
8. Quand la passerelle d'IA est indisponible, en erreur ou dépasse 4 secondes, le système retombe sur le moteur de règles locales et affiche l'information de mode dégradé dans `#status`.

## Hors périmètre

ArtBot ne fournit pas de conseils médicaux, juridiques ou financiers.

ArtBot ne permet pas de réserver des billets, d'acheter des billets ou d'effectuer des paiements.

ArtBot ne traite pas les demandes sans rapport avec les musées et les œuvres d'art.

## Données et fonctions attendues

- `public/index.html` : contient la structure de l'interface du chatbot.
- `public/js/persona.js` : contient l'identité, le nom, l'emoji, le message d'accueil et les suggestions.
- `public/js/view.js` : affiche l'identité, le message d'accueil et les suggestions.
- `public/js/app.js` : gère les interactions avec l'utilisateur.
- `public/js/brain.js` : génère les réponses du chatbot.
- `public/styles.css` : définit la présentation visuelle du chatbot.

Fonctions attendues :

- `getPersona()` : aucun paramètre ; retourne l'objet contenant le nom, l'emoji, le message d'accueil et les suggestions.
- `getSuggestions()` : aucun paramètre ; retourne un tableau contenant exactement trois suggestions.
- `getResponse(question)` : prend une question utilisateur en paramètre ; retourne une réponse signée `ArtBot`.
- `renderPersona()` : aucun paramètre ; affiche l'identité et le message d'accueil dans l'interface.

## Questions ouvertes

- Quelle structure exacte sera utilisée pour représenter l'identité du chatbot ?
- Comment les réponses seront-elles signées `ArtBot` ?
- Comment les suggestions seront-elles affichées dans l'interface ?
