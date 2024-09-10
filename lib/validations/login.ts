import { z } from "zod";

// TODO: Improve validations
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email provided." })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(1, { message: "Password is required" }),
});
