import { describe, expect, it } from "vitest";
import { AppError } from "@/lib/erreurs";
import { STATUTS_DOSSIER, changerStatut, peutPasser, transitionsPossibles } from "./cycle-de-vie";

describe("cycle de vie d'un dossier (§6.5)", () => {
  it("RG11: suit le parcours nominal d'un cas sensible jusqu'à la clôture", () => {
    const parcours = ["NOUVEAU", "EN_ANALYSE", "A_VERIFIER", "EN_COURS", "REPONDU", "CLOTURE"] as const;
    let statut = changerStatut("BROUILLON", parcours[0]);
    for (const suivant of parcours.slice(1)) {
      statut = changerStatut(statut, suivant);
    }
    expect(statut).toBe("CLOTURE");
  });

  it("RG11: refuse un passage absent du tableau §6.5", () => {
    expect(() => changerStatut("BROUILLON", "REPONDU")).toThrow(AppError);
    try {
      changerStatut("NOUVEAU", "CLOTURE");
    } catch (erreur) {
      expect((erreur as AppError).code).toBe("TRANSITION_INTERDITE");
    }
  });

  it("EF25: un dossier orienté passe à vérifier quand le producteur demande un conseiller", () => {
    expect(peutPasser("ORIENTE", "A_VERIFIER")).toBe(true);
  });

  it("EF32: la demande de complément fait des allers-retours avec le traitement", () => {
    expect(changerStatut("EN_COURS", "EN_ATTENTE_PRODUCTEUR")).toBe("EN_ATTENTE_PRODUCTEUR");
    expect(changerStatut("EN_ATTENTE_PRODUCTEUR", "EN_COURS")).toBe("EN_COURS");
  });

  it("RG11: un dossier clôturé ne change plus de statut", () => {
    expect(transitionsPossibles("CLOTURE")).toEqual([]);
  });

  it("RG11: chaque statut cible existe dans la liste des statuts", () => {
    for (const statut of STATUTS_DOSSIER) {
      for (const cible of transitionsPossibles(statut)) {
        expect(STATUTS_DOSSIER).toContain(cible);
      }
    }
  });
});
