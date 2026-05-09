import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/env";
import { unauthorized } from "@/helpers/throwResponses";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Comprobar si hay algún tipo de autenticación
  const { authorization } = req.headers;
  if (!authorization?.startsWith("Bearer ")) return unauthorized(res);

  const token = authorization.split(" ")[1];

  // Comprobar si el token es válido
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return unauthorized(res);
  }
}
