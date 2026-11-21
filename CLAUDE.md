# CLAUDE.md – NAATAL AI

Assistant agricole : producteur → conseiller → expert. Référence fonctionnelle : `docs/cahier-des-charges.pdf`.
Les identifiants EF (exigences), RG (règles de gestion) et CA (critères d'acceptation) viennent de ce document.

## Méthodologie

- Toute fonctionnalité suit le cycle /prd → /spec → /spec-plan → /tdd-task → /converge ; chaque spec cite ses EF, RG et CA.
- Un test d'abord, vu en échec, puis le code minimal ; `pnpm verify` (lint, types, tests) avant chaque commit.
- Une tâche = un commit Conventional Commits : `feat(dossiers): refuse une demande sans culture`.
- Le périmètre est la section 5 du cahier : ce qui n'est pas M ou S va dans `docs/backlog.md`, pas dans le code.

## Architecture

- Next.js (App Router) + TypeScript, PWA installable ; une seule application, un seul dépôt.
- Pages par rôle dans `src/app/(producteur|conseiller|expert|admin)/` ; elles n'appellent que `src/modules/`.
- Logique métier dans `src/modules/<domaine>/` (comptes, exploitations, dossiers, fiches, ia, notifications).
- Seuls les fichiers `*.repository.ts` touchent Prisma ; schéma dans `prisma/schema.prisma` (PostgreSQL + pgvector).
- Tâches lentes (analyse IA, transcription, notifications) dans `src/worker/` via pg-boss : une page n'attend jamais l'IA.
- Chaque service externe (LLM, transcription, synthèse vocale, SMS) est derrière une interface dans `src/modules/ia/providers/`.
- Médias envoyés directement au stockage S3 (MinIO) par URL signée, après compression sur le téléphone.
- Textes d'interface uniquement dans `messages/fr.json` et `messages/wo.json` (next-intl).
- Déploiement : `docker compose` (app, worker, PostgreSQL, MinIO), portable sur un serveur hébergé au Sénégal.

## Concepts appréciés

- Typage strict, pas de `any` ; fonctions courtes ; un fichier par cas d'usage (`creer-dossier.ts`).
- Le statut d'un dossier ne change que par `changerStatut()` de `src/modules/dossiers/cycle-de-vie.ts` (tableau 6.5, RG11).
- Design premium et léger : tokens dans `src/styles/tokens.css` (vert culture, or mil, terre ocre, crème), composants dans `src/ui/`.
- Animations en CSS (`transform`, `opacity`) ou View Transitions, désactivées si `prefers-reduced-motion`.
- Images en AVIF/WebP via `next/image`, chargées à la demande ; gros boutons et pictogrammes pour le producteur.

## Bonnes pratiques

- RG07 est codée en règles déterministes dans `src/modules/ia/escalade.ts` : le modèle peut ajouter une escalade, jamais en retirer.
- L'assistant ne cite que des fiches au statut `PUBLIEE` (RG13) ; chaque analyse enregistre modèle, version, fiches et date (RG05).
- Aucun nom ni téléphone n'est envoyé aux services d'IA : seulement photos, texte, culture et stade.
- Toute entrée est validée par un schéma Zod à l'entrée (Server Action ou route API), jamais par confiance au client.
- Les droits sont vérifiés côté serveur dans chaque cas d'usage (RG01, RG02), avec un test par règle.
- Aucun secret dans le code : `.env` en local, variables du serveur en production.
- Budget : moins de 150 Ko de JS compressé par page producteur, vérifié en CI ; tests de charge k6 avant le pilote.
- Tests : Vitest pour `src/modules/`, Playwright pour les parcours A à D, jeu de cas IA `tests/cas-ia/` lancé en CI.

## Nommage

- Vocabulaire métier en français, comme le cahier : `Dossier`, `Parcelle`, `creerDossier()`.
- Fichiers en kebab-case : `creer-dossier.ts`, `dossier.repository.ts`.
- Types et composants en PascalCase : `StatutDossier`, `CarteDossier`.
- Codes d'erreur en majuscules : `DOSSIER_SANS_CONTENU`, `ACCES_REFUSE`.
- Titres de tests préfixés par l'exigence : `it('CA04: refuse une demande sans culture')`.
