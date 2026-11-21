import { PrismaClient } from "@prisma/client";

// Une seule connexion Prisma par processus (évite d'en ouvrir une à chaque rechargement en dev).
const globalPourPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalPourPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalPourPrisma.prisma = db;
}
