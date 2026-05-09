import type { Request, Response } from "express";
import { FEEDBACK } from "@/data/feedback";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";

export async function getCategories(_req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json({
      categories,
    });
  } catch {
    return throwRes({
      msg: FEEDBACK.ERROR.CATEGORY.NOT_GET_CATEGORIES,
      res,
      status: 400,
    });
  }
}
