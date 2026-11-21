"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { COOKIE_LANGUE, LANGUES } from "@/i18n/langues";

const schemaLangue = z.enum(LANGUES);

// EF03 : l'utilisateur choisit sa langue et peut la modifier.
export async function choisirLangue(formulaire: FormData): Promise<void> {
  const langue = schemaLangue.parse(formulaire.get("langue"));
  (await cookies()).set(COOKIE_LANGUE, langue, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: true,
  });
  revalidatePath("/", "layout");
}
