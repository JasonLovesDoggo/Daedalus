import { z } from "zod";

// Export supported platforms
export const SUPPORTED_PLATFORMS = [
  "github",
  "linkedin",
  "instagram",
  "twitch",
  "youtube",
  "personal",
] as const;

export type Platform = (typeof SUPPORTED_PLATFORMS)[number];

export const profileIntegrationSchema = z.object({
  platform: z.enum(SUPPORTED_PLATFORMS),
  url: z.string().url(),
});

export const profileSchema = z.object({
  bio: z.string().max(500).nullable(),
  hobbies: z.string().default(""),
  integrations: z.array(profileIntegrationSchema).default([]),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileIntegration = z.infer<typeof profileIntegrationSchema>;
