import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { exerciseUpdateSchema } from "@/schemas/exercise.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function updateExercise(req: Request, res: Response) {
  const { id } = req.params;
  const result = exerciseUpdateSchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  try {
    await prisma.exercise.update({
      where: { id },
      data: { name: result.data.name },
    });
    return res.status(200).json({ msg: FEEDBACK.SUCCESS.EXERCISE.UPDATED });
  } catch {
    return throwRes({ res, status: 400, msg: FEEDBACK.ERROR.EXERCISE.ALREADY_EXISTS });
  }
}
