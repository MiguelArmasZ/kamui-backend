import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function deleteSession(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.session.delete({ where: { id } });
    return res.status(200).json({ msg: FEEDBACK.SUCCESS.SESSION.DELETED });
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_DELETED });
  }
}
