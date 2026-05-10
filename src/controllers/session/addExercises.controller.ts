import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { addExercisesSchema } from "@/schemas/session.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function addExercisesToSession(req: Request, res: Response) {
  const { id } = req.params;
  const result = addExercisesSchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  const { exercises } = result.data;

  try {
    await prisma.$transaction(async (tx) => {
      for (const ex of exercises) {
        for (const serie of ex.series) {
          await tx.sessionExercise.create({
            data: {
              sessionId: id,
              exerciseId: ex.exerciseId,
              weight: serie.weight,
              sets: 1,
              reps: serie.reps,
              notes: ex.notes,
              isStrengthRecord: ex.isStrengthRecord,
              isHypertrophyRecord: ex.isHypertrophyRecord,
              stimulus: serie.reps < 8 ? "STRENGTH" : "HYPERTROPHY",
            },
          });
        }
      }
    });

    return res.status(200).json({ msg: FEEDBACK.SUCCESS.SESSION.UPDATED });
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_CREATED });
  }
}
