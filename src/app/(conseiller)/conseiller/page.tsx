import { getTranslations } from "next-intl/server";
import { Carte } from "@/ui/carte";
import { EspacePro } from "@/ui/espace-pro";

export const metadata = { title: "Conseiller" };

export default async function AccueilConseiller() {
  const t = await getTranslations("pro");

  return (
    <EspacePro
      titre={t("conseiller")}
      navigation={[
        { href: "/conseiller", libelle: t("dossiers") },
        { href: "/expert", libelle: t("expert") },
        { href: "/admin", libelle: t("admin") },
      ]}
    >
      <Carte className="text-encre-douce">{t("fileVide")}</Carte>
    </EspacePro>
  );
}
