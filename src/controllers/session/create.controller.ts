import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { sessionSchema } from "@/schemas/session.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function createSession(req: Request, res: Response) {
  const result = sessionSchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  const { date, categoryId, exercises } = result.data;

  try {
    await prisma.$transaction(async (tx) => {
      const session = await tx.session.create({
        data: { date: new Date(date), categoryId },
      });

      for (const ex of exercises) {
        for (const serie of ex.series) {
          await tx.sessionExercise.create({
            data: {
              sessionId: session.id,
              exerciseId: ex.exerciseId,
              weight: serie.weight,
              sets: 1,
              reps: serie.reps,
              notes: ex.notes,
              isRecord: ex.isRecord,
              stimulus: serie.reps < 8 ? "STRENGTH" : "HYPERTROPHY",
            },
          });
        }
      }
    });

    return res.status(201).json({ msg: FEEDBACK.SUCCESS.SESSION.CREATED });
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_CREATED });
  }
}
