import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getRecords(_req: Request, res: Response) {
  try {
    const all = await prisma.sessionExercise.findMany({
      where: { OR: [{ isStrengthRecord: true }, { isHypertrophyRecord: true }] },
      include: {
        exercise: true,
        session: { select: { date: true } },
      },
      orderBy: { session: { date: "desc" } },
    });

    // Por ejercicio, quedarse solo con el más reciente de cada tipo
    const byExercise = new Map<string, { strength?: (typeof all)[0]; hypertrophy?: (typeof all)[0] }>();

    for (const r of all) {
      if (!byExercise.has(r.exerciseId)) byExercise.set(r.exerciseId, {});
      const group = byExercise.get(r.exerciseId)!;
      if (r.isStrengthRecord && !group.strength) group.strength = r;
      if (r.isHypertrophyRecord && !group.hypertrophy) group.hypertrophy = r;
    }

    const records = Array.from(byExercise.values()).flatMap(({ strength, hypertrophy }) =>
      [strength, hypertrophy].filter(Boolean)
    );

    return res.status(200).json(records);
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.SESSION.NOT_GET_SESSIONS });
  }
}
