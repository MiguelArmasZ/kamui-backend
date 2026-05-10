import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function getExerciseProgress(req: Request, res: Response) {
  const id = req.params.id as string;

  try {
    const entries = await prisma.sessionExercise.findMany({
      where: { exerciseId: id },
      include: { session: { select: { date: true } } },
      orderBy: { session: { date: "asc" } },
    });

    const bySession = new Map<string, { date: string; weights: number[]; volume: number }>();

    for (const e of entries) {
      const dateKey = e.session.date.toISOString().split("T")[0];
      if (!bySession.has(dateKey)) {
        bySession.set(dateKey, { date: dateKey, weights: [], volume: 0 });
      }
      const s = bySession.get(dateKey)!;
      s.weights.push(e.weight);
      s.volume += e.weight * e.reps;
    }

    const data = Array.from(bySession.values())
      .map(({ date, weights, volume }) => ({
        date,
        maxWeight: Math.max(...weights),
        volume: Math.round(volume),
      }))
      .slice(-15);

    return res.status(200).json(data);
  } catch {
    return throwRes({ res, status: 500, msg: FEEDBACK.ERROR.EXERCISE.NOT_GET_EXERCISES });
  }
}
