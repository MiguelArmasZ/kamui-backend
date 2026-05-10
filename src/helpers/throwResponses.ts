import type { Response } from "express";
import { FEEDBACK } from "@/utils/feedback";

interface ThrowRes {
  res: Response;
  status: number;
  msg: string;
}

export function unauthorized(res: Response) {
  return res.status(401).json({ msg: FEEDBACK.ERROR.UNAUTHORIZED });
}

export function throwRes({ msg, res, status }: ThrowRes) {
  return res.status(status).json({ msg });
}

export function invalidData(res: Response) {
  return res.status(400).json({ msg: FEEDBACK.ERROR.INVALID_DATA });
}
