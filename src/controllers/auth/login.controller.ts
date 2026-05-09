import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";
import { FEEDBACK } from "@/data/feedback";
import { CREDENTIALS } from "@/data/user";
import { authSchema } from "@/schemas/auth.schema";

export function login(req: Request, res: Response) {
  // Validar tipos de datos y estructura
  const result = authSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ msg: FEEDBACK.ERROR.AUTH_DATA_INVALID });
  }

  const { password, user } = result.data;

  // Validar credenciales
  if (CREDENTIALS.PASSWORD !== password || CREDENTIALS.USER !== user) {
    return res.status(400).json({ msg: FEEDBACK.ERROR.CREDENTIALS_INVALID });
  }

  // Iniciar la sesión
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(200).json({ token });
}
