import { Router } from "express";
import { createCategory } from "@/controllers/category/create.controller";

export const router = Router();

router.post("/", createCategory);
