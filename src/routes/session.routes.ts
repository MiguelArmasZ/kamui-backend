import { Router } from "express";
import { createSession } from "@/controllers/session/create.controller";
import { getSessions } from "@/controllers/session/get.controller";
import { getRecords } from "@/controllers/session/getRecords.controller";
import { getSessionById } from "@/controllers/session/getById.controller";
import { addExercisesToSession } from "@/controllers/session/addExercises.controller";
import { updateSessionExercises } from "@/controllers/session/updateExercises.controller";
import { deleteSession } from "@/controllers/session/delete.controller";

export const router = Router();

router.post("/", createSession);
router.get("/", getSessions);
router.get("/records", getRecords);
router.get("/:id", getSessionById);
router.patch("/:id", addExercisesToSession);
router.put("/:id", updateSessionExercises);
router.delete("/:id", deleteSession);
