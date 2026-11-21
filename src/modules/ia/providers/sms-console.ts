import type { EnvoiSms } from "./types";

// Fournisseur SMS de développement : affiche le message dans la console au lieu de l'envoyer.
export const smsConsole: EnvoiSms = {
  async envoyer(telephone, message) {
    console.info(`[SMS dev] → ${telephone} : ${message}`);
  },
};
