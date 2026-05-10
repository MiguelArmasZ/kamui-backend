import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getRecords(_req: Request, res: Response) {
  try {
    const records = await prisma.sessionExercise.findMany({
      where: { OR: [{ isStrengthRecord: true }, { isHypertrophyRecord: true }] },
      include: {
        exercise: true,
        session: { select: { date: true } },
      },
      orderBy: { session: { date: "desc" } },
    });

    return res.status(200).json(records);
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_GET_SESSIONS });
  }
}
