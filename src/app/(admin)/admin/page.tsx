import { getTranslations } from "next-intl/server";
import { Carte } from "@/ui/carte";
import { EspacePro } from "@/ui/espace-pro";

export const metadata = { title: "Administration" };

const INDICATEURS = ["dossiers", "signalements", "fiches", "comptes"] as const;

export default async function AccueilAdmin() {
  const t = await getTranslations("pro");

  return (
    <EspacePro
      titre={t("admin")}
      navigation={[
        { href: "/admin", libelle: t("tableauDeBord") },
        { href: "/admin", libelle: t("comptes") },
        { href: "/admin", libelle: t("fiches") },
        { href: "/admin", libelle: t("signalements") },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {INDICATEURS.map((cle) => (
          <Carte key={cle}>
            <p className="text-sm text-encre-douce">{t(cle)}</p>
            <p className="mt-2 font-titre text-4xl font-semibold text-culture-800">–</p>
          </Carte>
        ))}
      </div>
    </EspacePro>
  );
}
