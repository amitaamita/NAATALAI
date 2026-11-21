import { z } from "zod";

// Variables d'environnement côté serveur, vérifiées au premier usage.
// Ne jamais importer ce fichier dans un composant client : les secrets restent sur le serveur (§7.2).
const schemaEnv = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.url(),
  SESSION_SECRET: z.string().min(32),
  DATABASE_URL: z.string().min(1),
  S3_ENDPOINT: z.url(),
  S3_REGION: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_ACCESS_KEY: z.string().min(1),
  S3_SECRET_KEY: z.string().min(1),
  SMS_PROVIDER: z.string().default("console"),
  SMS_API_KEY: z.string().optional(),
  AI_PROVIDER: z.string().default("aucun"),
  AI_API_KEY: z.string().optional(),
  STT_PROVIDER: z.string().default("aucun"),
  STT_API_KEY: z.string().optional(),
  TTS_PROVIDER: z.string().default("aucun"),
  TTS_API_KEY: z.string().optional(),
});

export type Env = z.infer<typeof schemaEnv>;

let envEnCache: Env | undefined;

export function lireEnv(): Env {
  envEnCache ??= schemaEnv.parse(process.env);
  return envEnCache;
}
