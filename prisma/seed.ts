// Données de développement uniquement : comptes et numéros fictifs, jamais de vraies personnes.
import { PrismaClient, Role, Langue } from "@prisma/client";

const prisma = new PrismaClient();

const CULTURES = [
  { code: "TOMATE", nomFr: "Tomate", nomWo: "Tamaate" },
  { code: "OIGNON", nomFr: "Oignon", nomWo: "Soble" },
  { code: "MIL", nomFr: "Mil", nomWo: "Dugub" },
];

const COMPTES_TEST: { nom: string; telephone: string; role: Role; langue: Langue }[] = [
  { nom: "Producteur Test", telephone: "+221700000001", role: Role.PRODUCTEUR, langue: Langue.WO },
  { nom: "Conseiller Test", telephone: "+221700000002", role: Role.CONSEILLER, langue: Langue.FR },
  { nom: "Expert Test", telephone: "+221700000003", role: Role.EXPERT, langue: Langue.FR },
  { nom: "Admin Test", telephone: "+221700000004", role: Role.ADMIN, langue: Langue.FR },
];

async function main() {
  for (const culture of CULTURES) {
    await prisma.culture.upsert({ where: { code: culture.code }, update: culture, create: culture });
  }

  const zone =
    (await prisma.zone.findFirst({ where: { region: "Thiès" } })) ??
    (await prisma.zone.create({ data: { region: "Thiès", departement: "Tivaouane" } }));

  for (const compte of COMPTES_TEST) {
    await prisma.utilisateur.upsert({
      where: { telephone: compte.telephone },
      update: {},
      create: { ...compte, zoneId: compte.role === Role.PRODUCTEUR ? null : zone.id },
    });
  }

  console.info(`Seed terminé : ${CULTURES.length} cultures, ${COMPTES_TEST.length} comptes de test.`);
}

main()
  .catch((erreur) => {
    console.error(erreur);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
