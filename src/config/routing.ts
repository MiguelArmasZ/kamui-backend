import { app } from "@/config/server";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { router as authRoutes } from "@/routes/auth.routes";
import { router as categoryRoutes } from "@/routes/category.routes";

export function routing() {
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", authMiddleware, categoryRoutes);
}
