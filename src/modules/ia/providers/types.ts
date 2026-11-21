// Contrats des services externes (risque R09 : fournisseurs remplaçables).
// Chaque implémentation vit dans ce dossier ; le reste du code ne connaît que ces interfaces.
// Règle : aucun nom ni téléphone de producteur ne traverse ces interfaces.

export type Langue = "fr" | "wo";

export type FicheSource = {
  ficheVersionId: string;
  titre: string;
  symptomes: string;
  causes: string;
  conduite: string;
};

export type DemandeAnalyse = {
  culture: string;
  stade?: string;
  description?: string;
  photos: { url: string; typeMime: string }[];
  fiches: FicheSource[]; // fiches PUBLIEE uniquement (RG13)
  langue: Langue;
};

export type ResultatAnalyse = {
  hypotheses: { libelle: string; ficheVersionId: string; justification: string }[];
  confiance: "FAIBLE" | "MOYEN" | "ELEVE";
  limites: string;
  infosManquantes?: string;
  questionsPrecision: string[];
  modele: string; // RG05
  versionModele: string; // RG05
};

export interface FournisseurIA {
  analyser(demande: DemandeAnalyse): Promise<ResultatAnalyse>;
  vectoriser(texte: string): Promise<number[]>;
}

export interface Transcripteur {
  transcrire(audio: { url: string; typeMime: string }, langue: Langue): Promise<{ texte: string; modele: string }>;
}

export interface SyntheseVocale {
  synthetiser(texte: string, langue: Langue): Promise<{ audio: Uint8Array; typeMime: string }>;
}

export interface EnvoiSms {
  envoyer(telephone: string, message: string): Promise<void>;
}
