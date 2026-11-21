import type { StatutDossier } from "@/modules/dossiers/cycle-de-vie";

const COULEURS: Record<StatutDossier, string> = {
  BROUILLON: "bg-creme-200 text-encre-douce",
  NOUVEAU: "bg-culture-100 text-culture-800",
  EN_ANALYSE: "bg-culture-100 text-culture-800",
  ORIENTE: "bg-culture-500 text-white",
  A_VERIFIER: "bg-mil-100 text-mil-700",
  EN_COURS: "bg-mil-400 text-culture-900",
  EN_ATTENTE_PRODUCTEUR: "bg-terre-100 text-terre-700",
  REPONDU: "bg-culture-700 text-creme-50",
  CLOTURE: "bg-creme-100 text-encre-douce",
};

export function BadgeStatut({ statut, libelle }: { statut: StatutDossier; libelle: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${COULEURS[statut]}`}>
      {libelle}
    </span>
  );
}
