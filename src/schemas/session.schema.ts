import * as z from "zod";

const serieSchema = z.object({
  weight: z.number().min(0),
  reps: z.number().int().positive(),
});

const sessionExerciseSchema = z.object({
  exerciseId: z.string(),
  notes: z.string().optional(),
  isStrengthRecord: z.boolean().default(false),
  isHypertrophyRecord: z.boolean().default(false),
  series: z.array(serieSchema).min(1),
});

export const sessionSchema = z.object({
  date: z.string(),
  categoryId: z.string(),
  exercises: z.array(sessionExerciseSchema).min(1),
});

export const addExercisesSchema = z.object({
  exercises: z.array(sessionExerciseSchema).min(1),
});
