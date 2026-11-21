# Constitution – NAATAL AI

Principes non négociables. Toute spec, tout plan et tout code les respectent. Une exception demande une
décision écrite dans `docs/decisions/`.

## 1. Sécurité du conseil agricole
- Aucun produit phytosanitaire ni dosage n'est montré au producteur sans validation d'un expert habilité (RG07).
- Une réponse incertaine n'est jamais présentée comme un diagnostic (RG06).
- L'assistant ne s'appuie que sur des fiches publiées et affiche ses sources (RG13).
- Toute analyse et toute modification d'une recommandation sont tracées (RG05, RG08).

## 2. Le producteur d'abord
- Utilisable sur un Android d'entrée de gamme en 3G, en wolof comme en français.
- Déclarer un problème tient en 3 écrans au plus ; le texte reste possible si la voix échoue.

## 3. Performance
- L'analyse IA ne bloque jamais l'interface ; le système accepte plus de charge en ajoutant des serveurs,
  sans changer le code.
- Les budgets de poids et de temps fixés dans le PRD sont vérifiés en CI.

## 4. Design premium et professionnel
- Palette agricole (vert, or mil, terre ocre, crème), typographie soignée, contrastes WCAG AA.
- Animations légères, désactivées si le téléphone le demande ; jamais au détriment du 3G.

## 5. Données personnelles
- Minimisation, consentement explicite dans la langue de l'utilisateur, suppression sur demande (loi 2008-12).
- Aucune donnée d'identité envoyée aux services d'IA ; aucune donnée utilisée pour entraîner un modèle sans
  consentement (RG09).

## 6. Méthode
- Cycle /prd → /spec → /spec-plan → /tdd-task → /converge pour toute fonctionnalité.
- Test d'abord, vu en échec ; une tâche = un commit Conventional Commits.
- Le périmètre est celui du PRD ; le reste va dans `docs/backlog.md`.
