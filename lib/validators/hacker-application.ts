import { z } from "zod";

export const hackerApplicationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  age: z
    .union([z.number(), z.string()])
    .optional()
    .transform((val) => (val === "" || val === null ? undefined : Number(val))),
  pronouns: z.string().optional(),
  email: z.string().email().optional(),
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
  school: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z
    .union([z.number(), z.string()])
    .optional()
    .transform((val) => (val === "" || val === null ? undefined : Number(val))),
  levelOfStudy: z.string().optional(),
  technicalInterests: z.string().optional(),
  hackathonsAttended: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  country: z.string().optional(),
  shortAnswer1: z.string().optional(),
  shortAnswer2: z.string().optional(),
  mlhCheckbox1: z.boolean(),
  mlhCheckbox2: z.boolean(),
  mlhCheckbox3: z.boolean(),
  resumeUrl: z
    .string()
    .optional()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Invalid URL",
    }),
  shareResume: z.boolean().optional(),
});

export type HackerApplicationFormValues = z.infer<
  typeof hackerApplicationSchema
>;
