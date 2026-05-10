import * as z from "zod";

export const exerciseSchema = z.object({
  name: z.string().trim().toLowerCase(),
  categoryId: z.string(),
});
