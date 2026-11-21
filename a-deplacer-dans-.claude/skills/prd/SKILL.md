---
name: prd
description: Rédige ou met à jour le PRD du projet (specs/prd.md) à partir du cahier des charges, de CLAUDE.md et de specs/constitution.md. Première étape du cycle /prd → /spec → /spec-plan → /tdd-task → /converge.
argument-hint: "[périmètre, ex. « MVP » ou « module 4 – assistant IA »]"
---

# /prd – Product Requirements Document

Tu rédiges le PRD : le **quoi** et le **pourquoi**, jamais le **comment** (pas de framework, de table ni d'API).
Le PRD est la référence de toutes les commandes suivantes du cycle.

## Entrées à lire, dans cet ordre

1. `CLAUDE.md` – règles du projet.
2. `specs/constitution.md` – principes non négociables.
3. `docs/cahier-des-charges.pdf` – lis-le en entier, par tranches de pages (sections 1 à 13).
4. `specs/prd.md` s'il existe déjà : tu le mets à jour au lieu de repartir de zéro.
5. `docs/backlog.md` – ce qui est déjà écarté.

Périmètre demandé : `$ARGUMENTS` (par défaut : le MVP complet).

## Étape 1 – Questions avant d'écrire

Liste les points flous ou contradictoires entre les sources (zone, cultures, partenaire, droits
conseiller/expert, cibles chiffrées…). Pose au plus 5 questions à l'utilisateur, en une fois, et attends ses
réponses. Ce qui reste sans réponse va dans « Questions ouvertes », jamais inventé.

## Étape 2 – Écrire `specs/prd.md` avec exactement ces sections

1. **En-tête** : version, date, sources, statut (« brouillon à valider »).
2. **Problème** – qui souffre de quoi, aujourd'hui, en 5 lignes au plus.
3. **Vision** – une phrase, plus ce que le produit ne fait pas.
4. **Objectifs et mesures de succès** – tableau indicateur / mode de mesure / cible (cahier §10).
5. **Non-objectifs** – repris du cahier §5.2 et de `docs/backlog.md`.
6. **Utilisateurs** – une persona par rôle (producteur, conseiller, expert, admin), avec son contexte réel
   (smartphone d'entrée de gamme, 3G, langue).
7. **Périmètre du pilote** – zone, cultures, langues, canal, nombre d'utilisateurs.
8. **Récits utilisateur par module** – tableau `ID | En tant que…, je veux…, afin de… | Prio MoSCoW | Réf.`
   - IDs `US01`, `US02`… stables : ne renumérote jamais un récit existant.
   - Chaque récit cite au moins une référence du cahier (EF, RG ou CA). Un récit sans référence est signalé
     comme « ajout » et justifié.
9. **Cycle de vie d'un dossier** – les statuts du cahier §6.5 et leurs passages.
10. **Garde-fous IA** – RG05, RG06, RG07, RG08, RG09, RG12, RG13, formulés comme des règles vérifiables.
11. **Exigences non fonctionnelles** – avec une cible chiffrée par ligne, marquée « à confirmer » si elle ne
    vient pas du cahier. Inclure obligatoirement :
    - **Performance et montée en charge** : beaucoup d'utilisateurs simultanés à terme ; l'IA ne bloque
      jamais l'interface ; budget de poids et de temps de chargement en 3G.
    - **Design** : premium, professionnel, animations soignées et légères, palette agricole (vert, or mil,
      terre ocre, crème), photos réelles aux droits vérifiés, accessibilité WCAG AA.
    - Accessibilité, connectivité, sécurité, confidentialité (loi 2008-12, CDP), traçabilité.
12. **Parcours clés** – A producteur, B conseiller, C expert, D admin, plus le scénario « Awa ».
13. **Critères d'acceptation** – CA01 à CA15 du cahier, plus tout critère ajouté (numéroté à la suite).
14. **Dépendances et hypothèses**.
15. **Risques** – ceux du registre du cahier qui ont une parade produit.
16. **Jalons** – J1 à J5 du cahier.
17. **Découpage pour /spec** – liste ordonnée des fonctionnalités, chacune avec ses US, dans l'ordre de
    réalisation conseillé.
18. **Questions ouvertes**.

## Règles d'écriture

- Français clair, phrases courtes, tableaux plutôt que paragraphes.
- Aucune information inventée : chaque chiffre vient du cahier ou est marqué « proposition, à confirmer ».
- Respecter la priorisation MoSCoW du cahier ; tout ce qui est C ou W va dans `docs/backlog.md`.
- Ne pas écrire de code ni créer d'autres fichiers que `specs/prd.md` et, si besoin, `docs/backlog.md`.

## Étape 3 – Vérifier avant de rendre la main

- Chaque EF de priorité M du cahier est couverte par au moins un récit (affiche la table de couverture EF → US
  et signale les manques).
- Chaque CA est rattaché à au moins un récit.
- Aucune mention de technologie.

Termine par un résumé de 5 lignes : nombre de récits par priorité, EF non couvertes, questions ouvertes, et
la prochaine commande à lancer (`/spec <première fonctionnalité du découpage>`).
