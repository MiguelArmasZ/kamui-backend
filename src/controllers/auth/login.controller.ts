import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  CREDENTIALS_PASSWORD,
  CREDENTIALS_USER,
  JWT_SECRET,
} from "@/config/env";
import { throwRes } from "@/helpers/throwResponses";
import { authSchema } from "@/schemas/auth.schema";
import { FEEDBACK } from "@/utils/feedback";

export function login(req: Request, res: Response) {
  // Validar tipos de datos y estructura
  const result = authSchema.safeParse(req.body);
  if (!result.success) {
    return throwRes({
      res,
      status: 400,
      msg: FEEDBACK.ERROR.AUTH_DATA_INVALID,
    });
  }

  const { password, user } = result.data;

  // Validar credenciales
  if (CREDENTIALS_PASSWORD !== password || CREDENTIALS_USER !== user) {
    return throwRes({
      res,
      status: 400,
      msg: FEEDBACK.ERROR.CREDENTIALS_INVALID,
    });
  }

  // Iniciar la sesión
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(200).json({ token });
}
