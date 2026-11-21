import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { LANGUES } from "@/i18n/langues";
import { MotifMil } from "@/ui/motif-mil";
import { choisirLangue } from "./actions";

const ATOUTS = [
  { cle: "Photo", icone: "📷" },
  { cle: "Voix", icone: "🎙️" },
  { cle: "Conseiller", icone: "🤝" },
] as const;

export default async function Accueil() {
  const t = await getTranslations();
  const langueActive = await getLocale();

  return (
    <main className="relative overflow-hidden">
      {/* Bandeau principal */}
      <section className="relative bg-linear-to-br from-culture-900 via-culture-800 to-culture-600 px-6 pb-24 pt-10 text-creme-50">
        <MotifMil className="pointer-events-none absolute -bottom-6 -right-10 h-72 w-72 text-culture-200 opacity-40 md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-5xl">
          <p className="animate-fondu font-titre text-xl font-semibold">
            NAATAL <span className="text-mil-400">AI</span>
          </p>

          <p className="mt-14 animate-monter text-sm font-semibold uppercase tracking-[0.2em] text-mil-300">
            {t("accueil.accroche")}
          </p>
          <h1 className="mt-4 max-w-2xl animate-monter text-4xl leading-tight font-semibold [animation-delay:80ms] md:text-6xl">
            {t("accueil.titre")}
          </h1>
          <p className="mt-6 max-w-xl animate-monter text-lg text-creme-100/85 [animation-delay:160ms]">
            {t("accueil.sousTitre")}
          </p>

          {/* Choix de la langue (EF03) */}
          <form action={choisirLangue} className="mt-10 animate-monter [animation-delay:240ms]">
            <p className="text-sm text-creme-100/70">{t("accueil.choisirLangue")}</p>
            <div className="mt-3 inline-flex rounded-full bg-culture-900/40 p-1 ring-1 ring-creme-50/15">
              {LANGUES.map((langue) => (
                <button
                  key={langue}
                  type="submit"
                  name="langue"
                  value={langue}
                  aria-pressed={langue === langueActive}
                  className={`min-h-12 rounded-full px-6 text-base font-semibold transition duration-200 ${
                    langue === langueActive
                      ? "bg-mil-400 text-culture-900 shadow-douce"
                      : "text-creme-100/80 hover:text-creme-50"
                  }`}
                >
                  {t(`langues.${langue}`)}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Entrées par profil */}
      <section className="relative mx-auto -mt-14 grid max-w-5xl gap-4 px-6 md:grid-cols-2">
        <Link
          href="/producteur"
          className="group animate-monter rounded-(--radius-carte) bg-white p-7 shadow-relief ring-1 ring-culture-100 transition duration-300 hover:-translate-y-1 [animation-delay:320ms]"
        >
          <span className="text-3xl" aria-hidden="true">🌱</span>
          <h2 className="mt-4 text-2xl font-semibold text-culture-900">{t("accueil.producteur")}</h2>
          <p className="mt-2 text-encre-douce">{t("accueil.producteurDetail")}</p>
          <span className="mt-6 inline-block text-culture-600 transition group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
        <Link
          href="/conseiller"
          className="group animate-monter rounded-(--radius-carte) bg-creme-100 p-7 shadow-douce ring-1 ring-creme-200 transition duration-300 hover:-translate-y-1 [animation-delay:400ms]"
        >
          <span className="text-3xl" aria-hidden="true">🧑🏾‍🌾</span>
          <h2 className="mt-4 text-2xl font-semibold text-culture-900">{t("accueil.pro")}</h2>
          <p className="mt-2 text-encre-douce">{t("accueil.proDetail")}</p>
          <span className="mt-6 inline-block text-culture-600 transition group-hover:translate-x-1" aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Les trois atouts */}
      <section className="mx-auto grid max-w-5xl gap-6 px-6 py-16 md:grid-cols-3">
        {ATOUTS.map(({ cle, icone }, index) => (
          <div
            key={cle}
            className="animate-monter"
            style={{ animationDelay: `${480 + index * 80}ms` }}
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-mil-100 text-2xl" aria-hidden="true">
              {icone}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-culture-900">{t(`accueil.atout${cle}Titre`)}</h3>
            <p className="mt-1 text-encre-douce">{t(`accueil.atout${cle}`)}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-creme-200 px-6 py-6 text-center text-sm text-encre-douce">
        {t("commun.avertissement")}
      </footer>
    </main>
  );
}
