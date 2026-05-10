import { Router } from "express";
import { createSession } from "@/controllers/session/create.controller";

export const router = Router();

router.post("/", createSession);
