import { config } from "dotenv";
import * as z from "zod";

config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.url(),
  FRONTEND_URL: z.url(),
});

export const { DATABASE_URL, FRONTEND_URL, PORT } = envSchema.parse(
  process.env,
);
