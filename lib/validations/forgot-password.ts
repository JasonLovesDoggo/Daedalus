import { z } from "zod";

// TODO: Improve validations
export const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email provided." })
    .trim(),
});
