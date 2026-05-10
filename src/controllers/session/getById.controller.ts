import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getSessionById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        sessionExercises: {
          include: { exercise: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!session) {
      return throwRes({ res, status: 404, msg: FEEDBACK.ERROR.SESSION.NOT_GET_SESSIONS });
    }

    return res.status(200).json(session);
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_GET_SESSIONS });
  }
}
