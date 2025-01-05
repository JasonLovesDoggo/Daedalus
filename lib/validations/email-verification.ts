import { z } from "zod";

export const NewCodeSchema = z.object({
  email: z.string().email("Invalid email address"),
});
