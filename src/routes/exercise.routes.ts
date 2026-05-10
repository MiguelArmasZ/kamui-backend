import { Router } from "express";
import { createExercise } from "@/controllers/exercise/create.controller";
import { getExercises } from "@/controllers/exercise/get.controller";

export const router = Router();

router.post("/", createExercise);
router.get("/", getExercises);
