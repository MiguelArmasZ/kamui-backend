import { Router } from "express";
import { createCategory } from "@/controllers/category/create.controller";
import { updateCategory } from "@/controllers/category/update.controller";
import { deleteAllCategories } from "@/controllers/category/deleteAll.controller";
import { getCategories } from "@/controllers/category/get.controller";

export const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.patch("/:id", updateCategory);
router.delete("/", deleteAllCategories);
