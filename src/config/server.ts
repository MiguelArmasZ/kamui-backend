import colors from "colors";
import cors from "cors";
import express from "express";
import { FRONTEND_URL, PORT } from "@/config/env";

export const app = express();

export function setup() {
  app.use(
    cors({
      origin: FRONTEND_URL,
    }),
  );
  app.use(express.json());

  app.listen(PORT, () => {
    const msg = "🚀 Servidor corriendo en el puerto:";
    console.log(colors.cyan(msg), colors.green(PORT));
  });
}
