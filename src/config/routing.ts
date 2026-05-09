import { app } from "@/config/server";
import { router as authRoutes } from "@/routes/auth.routes";

export function routing() {
  app.use("/api/auth", authRoutes);
}
