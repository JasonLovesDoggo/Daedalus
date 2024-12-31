import { z } from "zod";

export const hackerApplicationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  pronouns: z.string(),
  email: z.string().email(),
  github: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    }),
  linkedin: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    }),
  personalWebsite: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    }),
  school: z.string(),
  major: z.string(),
  graduationYear: z.number(),
  gender: z.string(),
  race: z.string(),
  country: z.string(),
  shortAnswer1: z.string(),
  shortAnswer2: z.string(),
  mlhCheckbox1: z.boolean(),
  mlhCheckbox2: z.boolean(),
  mlhCheckbox3: z.boolean(),
  resumeUrl: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    }),
});

export type HackerApplication = z.infer<typeof hackerApplicationSchema>;
