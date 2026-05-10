import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getSessions(req: Request, res: Response) {
  const { categoryId } = req.query;

  if (!categoryId || typeof categoryId !== "string") {
    return throwRes({ res, status: 400, msg: FEEDBACK.ERROR.INVALID_DATA });
  }

  try {
    const sessions = await prisma.session.findMany({
      where: { categoryId },
      include: {
        sessionExercises: {
          include: { exercise: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { date: "desc" },
    });

    return res.status(200).json(sessions);
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_GET_SESSIONS });
  }
}
