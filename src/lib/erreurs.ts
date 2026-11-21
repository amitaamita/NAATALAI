// Erreurs métier : un code stable en majuscules, traduit ensuite pour l'utilisateur.
export type CodeErreur =
  | "ACCES_REFUSE"
  | "NON_AUTHENTIFIE"
  | "DOSSIER_SANS_CONTENU"
  | "TRANSITION_INTERDITE"
  | "ENTREE_INVALIDE";

export class AppError extends Error {
  constructor(
    public readonly code: CodeErreur,
    message?: string,
  ) {
    super(message ?? code);
    this.name = "AppError";
  }
}
