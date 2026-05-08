import colors from "colors";
import express from "express";
import { PORT } from "@/config/env";

export const app = express();

export function setup() {
  app.listen(PORT, () => {
    const msg = "🚀 Servidor corriendo en el puerto:";
    console.log(colors.cyan(msg), colors.green(PORT));
  });
}
