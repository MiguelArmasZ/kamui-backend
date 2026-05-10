import { Router } from "express";
import { createSession } from "@/controllers/session/create.controller";
import { getSessions } from "@/controllers/session/get.controller";

export const router = Router();

router.post("/", createSession);
router.get("/", getSessions);
