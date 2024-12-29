import { z } from "zod";

export const hackerApplicationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  pronouns: z.string(),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  personalWebsite: z.string().url(),
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
  resumeUrl: z.string().url(),
});

export type HackerApplication = z.infer<typeof hackerApplicationSchema>;
