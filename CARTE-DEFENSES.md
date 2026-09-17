# Carte des défenses

Chaque ligne dit quelle connerie est arrêtée, par quoi, et **où est la preuve** : le lien d'un run rouge ou d'une PR bloquée. Une barrière sans preuve ne compte pas.

| Connerie | Barrière qui l'arrête | Preuve (lien) | Checkpoint |
|---|---|---|---|
| Régression | Tests de contrat et CI obligatoire sur `main` | https://github.com/capweb-2026/capweb-c1/pull/4 : run rouge des tests d'identité du CP2-2 | CP1 |
| Test affaibli ou supprimé | `check:tests` (TEST-CHANGE obligatoire) et relecture | https://github.com/capweb-2026/capweb-c1/pull/6 : PR piégée #6 refusée, modification de test non justifiée | CP2 |
| Dépendance ajoutée | `check:deps` et `dependances-autorisees.json` | https://github.com/capweb-2026/capweb-c1/pull/7 : PR piégée #7 refusée, ajout de dayjs sans autorisation | CP2 |
| Secret exposé | Clé stockée dans Vercel, appel côté serveur (`server/ia.js`), tests sans clé | https://github.com/capweb-2026/capweb-c1/pull/8 : validation sans clé dans le code | CP3 |
| IA qui sort de son thème | Prompt système et jeu d'évaluation hors CI | https://github.com/capweb-2026/capweb-c1/blob/main/evals/RAPPORT.md : rapport à 2 passages | CP3 |
| Faille (`innerHTML`, injection) | | | CP4 |
| Contrôle désactivé | | | CP4 |
| Action destructrice | | | CP4 |
