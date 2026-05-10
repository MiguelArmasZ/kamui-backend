import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../generated/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function deleteExercise(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await prisma.exercise.delete({ where: { id } });
    return res.status(200).json({ msg: FEEDBACK.SUCCESS.EXERCISE.DELETED });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2003") {
      return throwRes({ res, status: 409, msg: FEEDBACK.ERROR.EXERCISE.HAS_SESSIONS });
    }
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.EXERCISE.NOT_DELETED });
  }
}
