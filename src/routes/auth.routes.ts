import { Router } from "express";
import { login } from "@/controllers/auth/login.controller";

export const router = Router();

router.post("/", login);
