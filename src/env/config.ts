import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  AZURE_SAS_TOKEN: z.string(),
  AZURE_STORAGE_ACCOUNT_NAME: z.string(),
  AZURE_STORAGE_CONTAINER_NAME: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_KEY: z.string(),
  API_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;

export const getEnvSafely = (envKey: keyof typeof env) => {
  const envVal = env[envKey];
  if (!envVal) throw new Error(`Missing variable ${envKey}!`);
  return envVal;
};