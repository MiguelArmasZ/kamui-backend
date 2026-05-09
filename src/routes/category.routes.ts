import { Router } from "express";
import { createCategory } from "@/controllers/category/create.controller";
import { getCategories } from "@/controllers/category/get.controller";

export const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
