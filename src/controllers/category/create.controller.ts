import type { NextFunction, Request, Response } from "express";

export function createCategory(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.send("categoria creada");
}
