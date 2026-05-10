import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { exerciseSchema } from "@/schemas/exercise.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function createExercise(req: Request, res: Response) {
  const result = exerciseSchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  try {
    const exercise = await prisma.exercise.create({
      data: {
        name: result.data.name,
        categoryId: result.data.categoryId,
      },
    });

    return res.status(201).json({
      msg: FEEDBACK.SUCCESS.EXERCISE.CREATED,
      data: exercise,
    });
  } catch {
    return throwRes({
      res,
      status: 400,
      msg: FEEDBACK.ERROR.EXERCISE.ALREADY_EXISTS,
    });
  }
}
