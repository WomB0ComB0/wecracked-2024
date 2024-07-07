
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({
  path: '.env',
}); // Load environment variables from .env file

const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  AZURE_SAS_TOKEN: z.string(),
  AZURE_STORAGE_ACCOUNT_NAME: z.string(),
  AZURE_STORAGE_CONTAINER_NAME: z.string(),
  NEXT_PUBLIC_API_KEY: z.string(),
  API_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
});

let parsedEnv;
try {
  parsedEnv = envSchema.safeParse(process.env);
  if (!parsedEnv.success) {
    console.error("Environment variables validation failed:", parsedEnv.error.format());
    throw new Error("Environment variables validation failed. Check the logs for more details.");
  }
} catch (error) {
  console.error("Error loading environment variables:", error);
  throw new Error("Error loading environment variables. Check the logs for more details.");
}

export const env = parsedEnv.data as z.infer<typeof envSchema>;

export const getEnvSafely = (envKey: keyof typeof env): string => {
  try {
    const envVal = env[envKey];
    if (!envVal) {
      throw new Error(`Missing variable ${envKey}!`);
    }
    return envVal;
  } catch (error) {
    console.error(`Error accessing environment variable ${envKey}:`, error);
    throw error;
  }
};