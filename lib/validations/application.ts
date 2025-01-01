import { z } from "zod";

// TODO: Should I trim?
export const HackerApplicationDraftSchema = z
  .object({
    userId: z.string().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    age: z.number().int().positive(),
    pronouns: z
      .object({
        pronouns: z.string().trim(),
        customPronouns: z.string().trim(),
      })
      .refine(
        (value) =>
          value.pronouns === "" && value.customPronouns === "" ? false : true,
        {
          message: "Please provide your pronouns.",
        },
      ),
    email: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => value === "" || z.string().email().safeParse(value).success,
        {
          message: "Invalid email address.",
        },
      ),
    github: z
      .string()
      .url({ message: "Invalid URL provided." })
      .trim()
      .optional(),
    linkedin: z
      .string()
      .url({ message: "Invalid URL provided." })
      .trim()
      .optional(),
    personalWebsite: z
      .string()
      .url({ message: "Invalid URL provided." })
      .trim()
      .optional(),
    resumeUrl: z
      .string()
      .url({ message: "Invalid URL provided." })
      .trim()
      .optional(),
    shareResume: z.boolean().optional(),
    school: z.string().trim().optional(),
    major: z.string().trim().optional(),
    levelOfStudy: z.string().trim().optional(),
    graduationYear: z.number().int().positive().optional(),
    gender: z.string().trim().optional(),
    race: z.string().trim().optional(),
    country: z.string().trim().optional(),
    shortAnswer1: z.string().trim().optional(),
    shortAnswer2: z.string().trim().optional(),
    technicalInterests: z.string().trim().optional(),
    hackathonsAttended: z.string().optional(),
    mlhCheckbox1: z.boolean().optional(),
    mlhCheckbox2: z.boolean().optional(),
    mlhCheckbox3: z.boolean().optional(),
  })
  .strict();

// TODO could use zod-drizzle
// TODO: what should be optional and what shouldn't
// TODO custom error messages?
export const HackerApplicationSubmissionSchema = z
  .object({
    userId: z.string().trim(),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    age: z.number().int().positive(),
    pronouns: z.string().trim(),
    email: z.string().email().trim(),
    github: z.string().url().trim().optional(),
    linkedin: z.string().url().trim().optional(),
    personalWebsite: z.string().url().trim().optional(),
    resumeUrl: z.string().url().trim().optional(),
    shareResume: z.boolean().optional(),
    school: z.string().trim(),
    major: z.string().trim(),
    levelOfStudy: z.string().trim(),
    graduationYear: z.number().int().positive(),
    gender: z.string().trim(),
    race: z.string().trim(),
    country: z.string().trim(),
    shortAnswer1: z.string().trim(),
    shortAnswer2: z.string().trim(),
    technicalInterests: z.string().trim(),
    hackathonsAttended: z.string(),
    mlhCheckbox1: z.boolean(),
    mlhCheckbox2: z.boolean(),
    mlhCheckbox3: z.boolean(),
  })
  .strict();

export type THackerApplicationDraft = z.infer<
  typeof HackerApplicationDraftSchema
>;
export type THackerApplicationSubmission = z.infer<
  typeof HackerApplicationSubmissionSchema
>;
