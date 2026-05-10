import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getExercises(_req: Request, res: Response) {
  try {
    const exercises = await prisma.exercise.findMany({
      include: { category: true },
      orderBy: { name: "asc" },
    });
    return res.status(200).json(exercises);
  } catch {
    return throwRes({
      res,
      status: 400,
      msg: FEEDBACK.ERROR.EXERCISE.NOT_GET_EXERCISES,
    });
  }
}
