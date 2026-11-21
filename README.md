# NAATAL AI

Assistant agricole intelligent, multilingue et multimodal pour le Sénégal.
Producteur → assistant IA → conseiller → expert, dans un dossier suivi de bout en bout.

- Cahier des charges : `docs/cahier-des-charges.pdf`
- Règles du projet pour Claude Code : `CLAUDE.md`
- Principes non négociables : `specs/constitution.md`
## Prérequis (Windows)

1. **Node.js 22** : https://nodejs.org (version LTS).  
2. **pnpm** : dans un terminal, `npm install -g pnpm`.
3. **Docker Desktop** : https://www.docker.com/products/docker-desktop (pour la base et le stockage).

## Démarrer en local

```bash
# 1. Variables d'environnement
copy .env.example .env

# 2. Base de données (PostgreSQL + pgvector) et stockage des médias (MinIO)
docker compose up -d

# 3. Dépendances
pnpm install

# 4. Création des tables puis données de test (comptes fictifs)
pnpm db:migrate --name init
pnpm db:seed

# 5. Application (http://localhost:3000) et worker, dans deux terminaux
pnpm dev
pnpm worker:dev
```
Console du stockage : http://localhost:9001 (identifiants dans `docker-compose.yml`).
Explorer la base : `pnpm db:studio`.

## Commandes utiles

| Commande | Rôle |
|---|---|
| `pnpm verify` | Lint + types + tests : **avant chaque commit** |
| `pnpm test` | Tests unitaires (Vitest) |
| `pnpm test:e2e` | Parcours sur smartphone simulé (Playwright ; la 1re fois : `pnpm exec playwright install`) |
| `pnpm db:migrate --name <nom>` | Nouvelle migration après une modification de `prisma/schema.prisma` |

## Structure

```
src/
  app/                  Écrans (un groupe par rôle : (producteur), (conseiller), (expert), (admin))
  modules/<domaine>/    Logique métier : comptes, exploitations, dossiers, fiches, ia, notifications
  modules/ia/providers/ Services externes (IA, transcription, voix, SMS) derrière une interface
  worker/               Tâches de fond (pg-boss) : analyse IA, transcription, notifications, RG14
  ui/                   Composants du design system
  styles/tokens.css     Couleurs, polices, animations : la charte
  i18n/                 Choix de la langue
messages/               Textes fr.json et wo.json
prisma/                 Schéma de base et données de test
tests/e2e/              Parcours de bout en bout
deploy/                 Configuration du serveur (Caddy, HTTPS)
```

## Ce qui est en place / ce qui reste

En place : environnement, schéma de données complet (§6.8), charte graphique, accueil animé avec choix
français / wolof, espaces des 4 rôles (vides), application installable, cycle de vie des dossiers testé,
contrats des fournisseurs IA, worker, tests.

Chaque fonctionnalité se construit ensuite avec le cycle `/prd → /spec → /spec-plan → /tdd-task → /converge`.

**À faire valider :**
- `messages/wo.json` : les textes marqués `[WO]` sont à traduire par des locuteurs natifs (EF27). Les noms
  wolof des cultures dans `prisma/seed.ts` sont aussi à relire.
- L'icône `public/icons/` est provisoire, en attendant le logo.
- L'image MinIO est figée sur une version précise ; si elle n'est plus téléchargeable, utiliser un autre
  service compatible S3.
- Les numéros de `prisma/seed.ts` sont fictifs : ne jamais y mettre de vraies personnes.

## Déployer (serveur au Sénégal)

Sur le serveur (Linux avec Docker) :

```bash
# .env de production : décommenter et remplir la section « Production » de .env.example
docker compose -f docker-compose.prod.yml --env-file .env up -d --build
docker compose -f docker-compose.prod.yml exec app node node_modules/prisma/build/index.js migrate deploy
```

Caddy fournit le HTTPS automatiquement pour `DOMAINE` et `DOMAINE_MEDIAS` (les deux noms doivent pointer
vers le serveur). Avant l'arrivée de vrais producteurs : formalité CDP, sauvegardes de la base testées.
