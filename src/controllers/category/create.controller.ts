import type { Request, Response } from "express";
import { invalidData, throwRes } from "@/helpers/throwResponses";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/schemas/category.schema";
import { FEEDBACK } from "@/utils/feedback";

export async function createCategory(req: Request, res: Response) {
  const result = categorySchema.safeParse(req.body);
  if (!result.success) return invalidData(res);

  try {
    const category = await prisma.category.create({
      data: {
        name: result.data.name,
      },
    });

    return res.status(201).json({
      msg: FEEDBACK.SUCCESS.CATEGORY.CREATED,
      data: category,
    });
  } catch {
    return throwRes({
      res,
      status: 400,
      msg: FEEDBACK.ERROR.CATEGORY.ALREADY_EXISTS,
    });
  }
}
