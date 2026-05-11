import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { login } from "@/controllers/auth/login.controller";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Espera 15 minutos." },
});

export const router = Router();

router.post("/", loginLimiter, login);
