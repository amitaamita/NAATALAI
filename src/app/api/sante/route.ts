import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Vérification de santé utilisée par la supervision et le déploiement.
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ statut: "ok", base: "ok" });
  } catch {
    return NextResponse.json({ statut: "degrade", base: "indisponible" }, { status: 503 });
  }
}
