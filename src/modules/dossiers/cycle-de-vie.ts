import { AppError } from "@/lib/erreurs";

// Statuts d'un dossier (cahier §6.5). Identiques à l'enum StatutDossier de prisma/schema.prisma.
export const STATUTS_DOSSIER = [
  "BROUILLON",
  "NOUVEAU",
  "EN_ANALYSE",
  "ORIENTE",
  "A_VERIFIER",
  "EN_COURS",
  "EN_ATTENTE_PRODUCTEUR",
  "REPONDU",
  "CLOTURE",
] as const;

export type StatutDossier = (typeof STATUTS_DOSSIER)[number];

// Passages autorisés, tableau §6.5 du cahier des charges.
const TRANSITIONS: Record<StatutDossier, readonly StatutDossier[]> = {
  BROUILLON: ["NOUVEAU"],
  NOUVEAU: ["EN_ANALYSE"],
  EN_ANALYSE: ["ORIENTE", "A_VERIFIER"],
  ORIENTE: ["CLOTURE", "A_VERIFIER"], // À vérifier si le producteur demande un conseiller (EF25)
  A_VERIFIER: ["EN_COURS"],
  EN_COURS: ["EN_ATTENTE_PRODUCTEUR", "REPONDU"],
  EN_ATTENTE_PRODUCTEUR: ["EN_COURS"],
  REPONDU: ["CLOTURE", "EN_COURS"], // EN_COURS = maintenu en suivi (EF36)
  CLOTURE: [],
};

export function transitionsPossibles(depuis: StatutDossier): readonly StatutDossier[] {
  return TRANSITIONS[depuis];
}

export function peutPasser(depuis: StatutDossier, vers: StatutDossier): boolean {
  return TRANSITIONS[depuis].includes(vers);
}

// Seul point d'entrée pour changer le statut d'un dossier (RG11 : un et un seul statut valide).
export function changerStatut(depuis: StatutDossier, vers: StatutDossier): StatutDossier {
  if (!peutPasser(depuis, vers)) {
    throw new AppError("TRANSITION_INTERDITE", `Passage interdit : ${depuis} → ${vers}`);
  }
  return vers;
}
