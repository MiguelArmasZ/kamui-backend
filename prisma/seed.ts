import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const STR = "STRENGTH" as const;
const HYP = "HYPERTROPHY" as const;

function d(s: string) {
  return new Date(`${s}T10:00:00.000Z`);
}

type SE = {
  exerciseId: string;
  weight: number;
  sets: number;
  reps: number;
  notes?: string;
  isStrengthRecord?: boolean;
  isHypertrophyRecord?: boolean;
  stimulus: "STRENGTH" | "HYPERTROPHY";
};

async function createSession(categoryId: string, date: string, exercises: SE[]) {
  const session = await prisma.session.create({
    data: { date: d(date), categoryId },
  });
  await prisma.sessionExercise.createMany({
    data: exercises.map((e) => ({
      sessionId: session.id,
      exerciseId: e.exerciseId,
      weight: e.weight,
      sets: e.sets,
      reps: e.reps,
      notes: e.notes ?? null,
      isStrengthRecord: e.isStrengthRecord ?? false,
      isHypertrophyRecord: e.isHypertrophyRecord ?? false,
      stimulus: e.stimulus,
    })),
  });
}

async function main() {
  await prisma.sessionExercise.deleteMany();
  await prisma.session.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.category.deleteMany();

  // ── Categorías ────────────────────────────────────────────────────────────
  const [pull, push, leg] = await Promise.all([
    prisma.category.create({ data: { name: "Pull" } }),
    prisma.category.create({ data: { name: "Push" } }),
    prisma.category.create({ data: { name: "Leg" } }),
  ]);

  // ── Ejercicios Pull ───────────────────────────────────────────────────────
  const [dominadas, remo, predicador, martillo] = await Promise.all([
    prisma.exercise.create({ data: { name: "Dominadas lastradas", categoryId: pull.id } }),
    prisma.exercise.create({ data: { name: "Remo con barra", categoryId: pull.id } }),
    prisma.exercise.create({ data: { name: "Predicador", categoryId: pull.id } }),
    prisma.exercise.create({ data: { name: "Martillo", categoryId: pull.id } }),
  ]);

  // ── Ejercicios Push ───────────────────────────────────────────────────────
  const [fondos, pressBanca, pressMilitar, flexPino, pikePushUp] = await Promise.all([
    prisma.exercise.create({ data: { name: "Fondos lastrados", categoryId: push.id } }),
    prisma.exercise.create({ data: { name: "Press banca", categoryId: push.id } }),
    prisma.exercise.create({ data: { name: "Press militar", categoryId: push.id } }),
    prisma.exercise.create({ data: { name: "Flexiones a pino", categoryId: push.id } }),
    prisma.exercise.create({ data: { name: "Pike push-up", categoryId: push.id } }),
  ]);

  // ── Ejercicios Leg ────────────────────────────────────────────────────────
  const [sentTrasera, sentFrontal, zancadas, extensionQuad, gemelos] = await Promise.all([
    prisma.exercise.create({ data: { name: "Sentadilla trasera", categoryId: leg.id } }),
    prisma.exercise.create({ data: { name: "Sentadilla frontal", categoryId: leg.id } }),
    prisma.exercise.create({ data: { name: "Zancadas", categoryId: leg.id } }),
    prisma.exercise.create({ data: { name: "Extensión de cuádriceps", categoryId: leg.id } }),
    prisma.exercise.create({ data: { name: "Gemelos", categoryId: leg.id } }),
  ]);

  // ── Pull × 16 sesiones ───────────────────────────────────────────────────
  // S1 - 2026-01-10
  await createSession(pull.id, "2026-01-10", [
    { exerciseId: dominadas.id, weight: 12.5, sets: 3, reps: 10, stimulus: HYP },
    { exerciseId: remo.id,      weight: 70,   sets: 4, reps: 10, stimulus: HYP },
    { exerciseId: predicador.id, weight: 15,  sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S2 - 2026-01-19
  await createSession(pull.id, "2026-01-19", [
    { exerciseId: dominadas.id, weight: 12.5, sets: 3, reps: 11, stimulus: HYP },
    { exerciseId: remo.id,      weight: 70,   sets: 4, reps: 11, stimulus: HYP },
    { exerciseId: martillo.id,  weight: 16,   sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S3 - 2026-01-28
  await createSession(pull.id, "2026-01-28", [
    { exerciseId: dominadas.id, weight: 15, sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: remo.id,      weight: 75, sets: 4, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: predicador.id, weight: 15, sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S4 - 2026-02-05
  await createSession(pull.id, "2026-02-05", [
    { exerciseId: dominadas.id, weight: 15, sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: remo.id,      weight: 75, sets: 4, reps: 10, stimulus: HYP },
    { exerciseId: martillo.id,  weight: 18, sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S5 - 2026-02-14  ← primer intento con más peso, estímulo fuerza
  await createSession(pull.id, "2026-02-14", [
    { exerciseId: dominadas.id, weight: 17.5, sets: 3, reps: 7, stimulus: STR, isStrengthRecord: true },
    { exerciseId: remo.id,      weight: 80,   sets: 4, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: predicador.id, weight: 17.5, sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S6 - 2026-02-22
  await createSession(pull.id, "2026-02-22", [
    { exerciseId: dominadas.id, weight: 17.5, sets: 3, reps: 9, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: remo.id,      weight: 80,   sets: 4, reps: 9, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: martillo.id,  weight: 18,   sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S7 - 2026-03-02
  await createSession(pull.id, "2026-03-02", [
    { exerciseId: dominadas.id, weight: 17.5, sets: 4, reps: 8, stimulus: HYP },
    { exerciseId: remo.id,      weight: 80,   sets: 4, reps: 10, stimulus: HYP },
    { exerciseId: predicador.id, weight: 17.5, sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S8 - 2026-03-10  ← primera vez en 20kg, fuerza
  await createSession(pull.id, "2026-03-10", [
    { exerciseId: dominadas.id, weight: 20, sets: 3, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: remo.id,      weight: 85, sets: 4, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: martillo.id,  weight: 20, sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S9 - 2026-03-18
  await createSession(pull.id, "2026-03-18", [
    { exerciseId: dominadas.id, weight: 20, sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: remo.id,      weight: 85, sets: 4, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: predicador.id, weight: 20, sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S10 - 2026-03-27
  await createSession(pull.id, "2026-03-27", [
    { exerciseId: dominadas.id, weight: 20, sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: remo.id,      weight: 85, sets: 4, reps: 9,  stimulus: HYP },
    { exerciseId: martillo.id,  weight: 20, sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S11 - 2026-04-04  ← primera vez en 22.5kg
  await createSession(pull.id, "2026-04-04", [
    { exerciseId: dominadas.id, weight: 22.5, sets: 3, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: remo.id,      weight: 90,   sets: 4, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: predicador.id, weight: 20,  sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S12 - 2026-04-12
  await createSession(pull.id, "2026-04-12", [
    { exerciseId: dominadas.id, weight: 22.5, sets: 3, reps: 7, stimulus: STR },
    { exerciseId: remo.id,      weight: 90,   sets: 4, reps: 7, stimulus: STR },
    { exerciseId: martillo.id,  weight: 22,   sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S13 - 2026-04-20
  await createSession(pull.id, "2026-04-20", [
    { exerciseId: dominadas.id, weight: 22.5, sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: remo.id,      weight: 90,   sets: 4, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: predicador.id, weight: 22.5, sets: 3, reps: 8, stimulus: HYP },
  ]);

  // S14 - 2026-04-28
  await createSession(pull.id, "2026-04-28", [
    { exerciseId: dominadas.id, weight: 22.5, sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: remo.id,      weight: 90,   sets: 4, reps: 10, stimulus: HYP },
    { exerciseId: martillo.id,  weight: 22,   sets: 3, reps: 12, stimulus: HYP },
  ]);

  // S15 - 2026-05-05  ← primera vez en 25kg
  await createSession(pull.id, "2026-05-05", [
    { exerciseId: dominadas.id, weight: 25,   sets: 3, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: remo.id,      weight: 92.5, sets: 4, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: predicador.id, weight: 22.5, sets: 3, reps: 10, stimulus: HYP },
  ]);

  // S16 - 2026-05-10
  await createSession(pull.id, "2026-05-10", [
    { exerciseId: dominadas.id, weight: 25,   sets: 3, reps: 6, stimulus: STR },
    { exerciseId: remo.id,      weight: 92.5, sets: 4, reps: 6, stimulus: STR },
    { exerciseId: martillo.id,  weight: 24,   sets: 3, reps: 8, stimulus: HYP },
  ]);

  // ── Push × 7 sesiones ────────────────────────────────────────────────────
  await createSession(push.id, "2026-01-12", [
    { exerciseId: fondos.id,      weight: 20,   sets: 3, reps: 10, stimulus: HYP },
    { exerciseId: pressBanca.id,  weight: 70,   sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: pressMilitar.id, weight: 47.5, sets: 3, reps: 8, stimulus: HYP },
    { exerciseId: flexPino.id,    weight: 0,    sets: 3, reps: 8,  stimulus: HYP },
  ]);

  await createSession(push.id, "2026-01-30", [
    { exerciseId: fondos.id,      weight: 22.5, sets: 3, reps: 10, stimulus: HYP },
    { exerciseId: pressBanca.id,  weight: 72.5, sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: pressMilitar.id, weight: 47.5, sets: 3, reps: 10, stimulus: HYP },
    { exerciseId: pikePushUp.id,  weight: 0,    sets: 3, reps: 12, stimulus: HYP },
  ]);

  await createSession(push.id, "2026-02-16", [
    { exerciseId: fondos.id,      weight: 25,   sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: pressBanca.id,  weight: 75,   sets: 4, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressMilitar.id, weight: 50,  sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: flexPino.id,    weight: 0,    sets: 3, reps: 10, stimulus: HYP },
  ]);

  await createSession(push.id, "2026-03-04", [
    { exerciseId: fondos.id,      weight: 27.5, sets: 3, reps: 6,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressBanca.id,  weight: 77.5, sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: pressMilitar.id, weight: 50,  sets: 3, reps: 10, stimulus: HYP },
    { exerciseId: pikePushUp.id,  weight: 0,    sets: 4, reps: 10, stimulus: HYP },
  ]);

  await createSession(push.id, "2026-03-22", [
    { exerciseId: fondos.id,      weight: 27.5, sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: pressBanca.id,  weight: 80,   sets: 4, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressMilitar.id, weight: 52.5, sets: 3, reps: 8, stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: flexPino.id,    weight: 0,    sets: 4, reps: 10, stimulus: HYP },
  ]);

  await createSession(push.id, "2026-04-08", [
    { exerciseId: fondos.id,      weight: 30,   sets: 3, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressBanca.id,  weight: 82.5, sets: 4, reps: 5, stimulus: STR },
    { exerciseId: pressMilitar.id, weight: 55,  sets: 3, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pikePushUp.id,  weight: 0,    sets: 4, reps: 8, stimulus: HYP },
  ]);

  await createSession(push.id, "2026-04-27", [
    { exerciseId: fondos.id,      weight: 32.5, sets: 3, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressBanca.id,  weight: 85,   sets: 4, reps: 5, stimulus: STR, isStrengthRecord: true },
    { exerciseId: pressMilitar.id, weight: 57.5, sets: 3, reps: 6, stimulus: STR, isStrengthRecord: true },
    { exerciseId: flexPino.id,    weight: 0,    sets: 4, reps: 8, stimulus: HYP },
  ]);

  // ── Leg × 7 sesiones ─────────────────────────────────────────────────────
  await createSession(leg.id, "2026-01-14", [
    { exerciseId: sentTrasera.id,   weight: 80,   sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: zancadas.id,      weight: 20,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: extensionQuad.id, weight: 40,   sets: 3, reps: 15, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 60,   sets: 4, reps: 15, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-02-01", [
    { exerciseId: sentTrasera.id,   weight: 85,   sets: 4, reps: 8,  stimulus: HYP },
    { exerciseId: sentFrontal.id,   weight: 60,   sets: 4, reps: 5,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: extensionQuad.id, weight: 42.5, sets: 3, reps: 15, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 60,   sets: 4, reps: 20, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-02-19", [
    { exerciseId: sentTrasera.id,   weight: 90,   sets: 4, reps: 6,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: zancadas.id,      weight: 22,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: extensionQuad.id, weight: 45,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 65,   sets: 4, reps: 15, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-03-07", [
    { exerciseId: sentTrasera.id,   weight: 90,   sets: 4, reps: 8,  stimulus: HYP, isHypertrophyRecord: true },
    { exerciseId: sentFrontal.id,   weight: 62.5, sets: 4, reps: 5,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: extensionQuad.id, weight: 47.5, sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 65,   sets: 4, reps: 20, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-03-26", [
    { exerciseId: sentTrasera.id,   weight: 95,   sets: 4, reps: 6,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: zancadas.id,      weight: 24,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: extensionQuad.id, weight: 50,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 70,   sets: 4, reps: 15, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-04-14", [
    { exerciseId: sentTrasera.id,   weight: 97.5, sets: 4, reps: 5,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: sentFrontal.id,   weight: 65,   sets: 4, reps: 5,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: extensionQuad.id, weight: 50,   sets: 3, reps: 15, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 70,   sets: 4, reps: 20, stimulus: HYP },
  ]);

  await createSession(leg.id, "2026-05-01", [
    { exerciseId: sentTrasera.id,   weight: 100,  sets: 4, reps: 5,  stimulus: STR, isStrengthRecord: true },
    { exerciseId: zancadas.id,      weight: 26,   sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: extensionQuad.id, weight: 52.5, sets: 3, reps: 12, stimulus: HYP },
    { exerciseId: gemelos.id,       weight: 75,   sets: 4, reps: 15, stimulus: HYP },
  ]);

  console.log("Seed completado: 3 categorías, 14 ejercicios, 30 sesiones (16 Pull + 7 Push + 7 Leg)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
