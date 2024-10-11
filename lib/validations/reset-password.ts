import { z } from "zod";

// TODO: Improve validations
export const ResetPasswordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, { message: "Password is required" }),
  token: z.string({ required_error: "Token is required" }).trim(),
});
