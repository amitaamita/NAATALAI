// Noms des files de tâches de fond (pg-boss). Une page n'attend jamais ces traitements.
export const FILES = {
  ANALYSE_IA: "analyse-ia", // module 4
  TRANSCRIPTION: "transcription", // EF19
  NOTIFICATION: "notification", // module 7
  RELANCE_A_VERIFIER: "relance-a-verifier", // RG14
} as const;

export type NomFile = (typeof FILES)[keyof typeof FILES];
