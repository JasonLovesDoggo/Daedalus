import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().max(32, "Password is too long"),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
