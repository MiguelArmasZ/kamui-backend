import { Router } from "express";
import { createExercise } from "@/controllers/exercise/create.controller";
import { getExercises } from "@/controllers/exercise/get.controller";
import { updateExercise } from "@/controllers/exercise/update.controller";
import { deleteExercise } from "@/controllers/exercise/delete.controller";

export const router = Router();

router.post("/", createExercise);
router.get("/", getExercises);
router.patch("/:id", updateExercise);
router.delete("/:id", deleteExercise);
