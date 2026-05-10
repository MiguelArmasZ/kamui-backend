import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas/category.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function updateCategory(req: Request, res: Response) {
  const { id } = req.params;
  const result = categorySchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  try {
    await prisma.category.update({
      where: { id },
      data: { name: result.data.name },
    });
    return res.status(200).json({ msg: FEEDBACK.SUCCESS.CATEGORY.UPDATED });
  } catch {
    return throwRes({ res, status: 400, msg: FEEDBACK.ERROR.CATEGORY.ALREADY_EXISTS });
  }
}
