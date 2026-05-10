/*
  Warnings:

  - You are about to drop the column `isRecord` on the `SessionExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SessionExercise" DROP COLUMN "isRecord",
ADD COLUMN     "isHypertrophyRecord" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStrengthRecord" BOOLEAN NOT NULL DEFAULT false;
