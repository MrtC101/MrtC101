import { z } from 'zod'

const socialNetworkSchema = z.object({
  network: z.string(),
  username: z.string(),
})

const experienceEntrySchema = z.object({
  company: z.string(),
  position: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  // Comma-separated, same convention as technical_skills[].details — rendercv's
  // PDF templater breaks on list-valued extra fields, so this must stay a string.
  stack: z.string().optional(),
  // Filename (no extension) of a logo registered in src/lib/logos.ts.
  logo: z.string().optional(),
  // Folder name under src/assets/gallery/ (see src/lib/gallery.ts).
  gallery: z.string().optional(),
  summary: z.string(),
  highlights: z.array(z.string()),
})

const educationEntrySchema = z.object({
  institution: z.string(),
  area: z.string(),
  study_type: z.string(),
  start_date: z.union([z.string(), z.number()]),
  end_date: z.union([z.string(), z.number()]),
  logo: z.string().optional(),
})

const technicalSkillGroupSchema = z.object({
  label: z.string(),
  details: z.string(),
  // Stable, non-localized identifier for groups the UI treats specially
  // (e.g. rendering the languages group as proficiency bars instead of badges).
  key: z.string().optional(),
})

const achievementSchema = z.object({
  bullet: z.string(),
})

export const cvSchema = z.object({
  cv: z.object({
    name: z.string(),
    location: z.string(),
    email: z.string(),
    website: z.string(),
    headline: z.string(),
    social_networks: z.array(socialNetworkSchema),
    sections: z.object({
      summary: z.array(z.string()),
      experience: z.array(experienceEntrySchema),
      education: z.array(educationEntrySchema),
      technical_skills: z.array(technicalSkillGroupSchema),
      awards: z.array(achievementSchema),
      languages: z.array(achievementSchema),
    }),
  }),
})

export type CvContent = z.infer<typeof cvSchema>
