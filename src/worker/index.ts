import PgBoss from "pg-boss";
import { FILES } from "./files";

// Processus séparé de l'application web : lancé avec `pnpm worker` (ou `pnpm worker:dev`).
// Chaque traitement sera implémenté par sa propre spec ; ici on ne fait que câbler les files.
async function demarrer() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL manquant");

  const boss = new PgBoss(url);
  boss.on("error", (erreur) => console.error("[worker]", erreur));
  await boss.start();

  for (const file of Object.values(FILES)) {
    await boss.createQueue(file);
  }

  await boss.work(FILES.ANALYSE_IA, async ([tache]) => {
    console.info("[worker] analyse IA à implémenter (module 4)", tache?.id);
  });

  await boss.work(FILES.TRANSCRIPTION, async ([tache]) => {
    console.info("[worker] transcription à implémenter (EF19)", tache?.id);
  });

  await boss.work(FILES.NOTIFICATION, async ([tache]) => {
    console.info("[worker] notification à implémenter (module 7)", tache?.id);
  });

  // RG14 : chaque heure, repérer les dossiers « À vérifier » non pris en charge depuis 48 h.
  await boss.schedule(FILES.RELANCE_A_VERIFIER, "0 * * * *");
  await boss.work(FILES.RELANCE_A_VERIFIER, async () => {
    console.info("[worker] relance RG14 à implémenter");
  });

  console.info("[worker] démarré, files :", Object.values(FILES).join(", "));

  const arreter = async () => {
    await boss.stop({ graceful: true });
    process.exit(0);
  };
  process.on("SIGINT", arreter);
  process.on("SIGTERM", arreter);
}

demarrer().catch((erreur) => {
  console.error("[worker] arrêt sur erreur", erreur);
  process.exit(1);
});
