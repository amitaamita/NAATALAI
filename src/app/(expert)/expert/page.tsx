import { getTranslations } from "next-intl/server";
import { Carte } from "@/ui/carte";
import { EspacePro } from "@/ui/espace-pro";

export const metadata = { title: "Expert" };

export default async function AccueilExpert() {
  const t = await getTranslations("pro");

  return (
    <EspacePro
      titre={t("expert")}
      navigation={[
        { href: "/expert", libelle: t("dossiers") },
        { href: "/expert", libelle: t("fiches") },
      ]}
    >
      <Carte className="text-encre-douce">{t("fileVide")}</Carte>
    </EspacePro>
  );
}
