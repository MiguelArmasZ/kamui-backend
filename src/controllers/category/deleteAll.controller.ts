import type { Request, Response } from "express";
import { throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { FEEDBACK } from "@/utils/feedback";

export async function deleteAllCategories(_req: Request, res: Response) {
  try {
    await prisma.category.deleteMany();

    return res.status(200).json({ msg: FEEDBACK.SUCCESS.CATEGORY.DELETED_ALL });
  } catch {
    return throwRes({
      res,
      status: 500,
      msg: FEEDBACK.ERROR.CATEGORY.NOT_GET_CATEGORIES,
    });
  }
}
