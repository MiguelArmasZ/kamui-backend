import { config } from "dotenv";
import * as z from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url(),
  JWT_SECRET: z.string(),
  CREDENTIALS_USER: z.string(),
  CREDENTIALS_PASSWORD: z.string(),
});

export const {
  DATABASE_URL,
  FRONTEND_URL,
  PORT,
  JWT_SECRET,
  CREDENTIALS_PASSWORD,
  CREDENTIALS_USER,
} = envSchema.parse(process.env);
