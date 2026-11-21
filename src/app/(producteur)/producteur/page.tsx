import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Carte } from "@/ui/carte";

export const metadata = { title: "Producteur" };

// Accueil producteur : un seul geste principal, gros bouton, lisible en plein soleil.
export default async function AccueilProducteur() {
  const t = await getTranslations();

  return (
    <main className="mx-auto min-h-dvh max-w-md px-5 pb-28 pt-8">
      <Link href="/" className="font-titre text-lg font-semibold text-culture-800">
        NAATAL <span className="text-mil-500">AI</span>
      </Link>
      <h1 className="mt-8 animate-monter text-3xl font-semibold text-culture-900">{t("producteur.titre")}</h1>

      <button
        type="button"
        disabled
        className="mt-8 flex w-full animate-monter items-center gap-4 rounded-(--radius-carte) bg-culture-700 p-6 text-left text-creme-50 shadow-relief transition [animation-delay:100ms] active:scale-[0.98] disabled:opacity-90"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-mil-400 text-3xl" aria-hidden="true">
          📷
        </span>
        <span>
          <span className="block text-xl font-semibold">{t("producteur.declarer")}</span>
          <span className="block text-creme-100/80">{t("producteur.declarerDetail")}</span>
          <span className="mt-1 block text-xs text-mil-300">{t("commun.bientot")}</span>
        </span>
      </button>

      <h2 className="mt-10 animate-monter text-xl font-semibold text-culture-900 [animation-delay:180ms]">
        {t("producteur.mesDossiers")}
      </h2>
      <Carte className="mt-4 animate-monter text-encre-douce [animation-delay:240ms]">
        {t("producteur.aucunDossier")}
      </Carte>
    </main>
  );
}
