import * as z from "zod";

export const authSchema = z.object({
  user: z.string(),
  password: z.string(),
});
