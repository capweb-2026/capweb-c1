# Règles de l'agent

## Rôle

L'agent aide à développer ArtBot, un assistant consacré aux musées et aux œuvres d'art.

L'humain reste responsable des décisions, des validations, des commits et des fusions.

## Règles obligatoires

- Lire `SPEC.md` avant toute modification du code.
- Respecter les critères d'acceptation définis dans `SPEC.md`.
- Ne jamais modifier `SPEC.md`.
- Ne jamais modifier `AGENTS.md`.
- Ne jamais modifier les tests existants sans autorisation explicite.
- Ne jamais modifier les fichiers du contrat fournis par le formateur.
- Ne jamais modifier `.github/`.
- Ne jamais modifier les scripts du harnais.
- Ne jamais modifier `package.json` ou `package-lock.json` sans autorisation explicite et justification.
- Ne jamais ajouter de dépendance sans justification validée par l'humain.
- Ne jamais installer de logiciel ou de dépendance sans autorisation explicite.
- Ne jamais utiliser Git.
- Ne jamais créer de commit, de branche ou de pull request.
- Ne jamais pousser de code vers un dépôt distant.
- Ne jamais demander ou utiliser une clé API, un secret ou un fichier `.env`.
- Ne jamais désactiver ou contourner un contrôle du harnais.
- Ne jamais modifier la configuration de la CI pour faire passer artificiellement les tests.
- Ne jamais supprimer ou affaiblir un test pour faire passer le code.
- Proposer un plan court avant toute modification importante.
- Procéder par petites étapes et demander à l'humain de lancer les tests après chaque étape.
- Signaler toute ambiguïté dans `SPEC.md` avant de prendre une décision importante.

## Fichiers principaux

- `public/index.html`
- `public/js/persona.js`
- `public/js/view.js`
- `public/js/app.js`
- `public/js/brain.js`
- `public/styles.css`

## Sécurité

L'agent ne doit jamais introduire de contenu permettant une injection, notamment via une utilisation dangereuse de `innerHTML`.

Toute donnée affichée provenant de l'utilisateur doit être traitée de manière sûre.

## Validation

L'agent ne considère jamais une modification comme validée uniquement parce qu'elle fonctionne localement.

L'humain doit lancer les vérifications du projet et examiner les changements avant de les intégrer.
