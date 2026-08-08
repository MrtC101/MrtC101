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
  summary: z.string(),
  highlights: z.array(z.string()),
})

const educationEntrySchema = z.object({
  institution: z.string(),
  area: z.string(),
  study_type: z.string(),
  start_date: z.union([z.string(), z.number()]),
  end_date: z.union([z.string(), z.number()]),
})

const technicalSkillGroupSchema = z.object({
  label: z.string(),
  details: z.string(),
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
      profile: z.array(z.string()),
      experience: z.array(experienceEntrySchema),
      education: z.array(educationEntrySchema),
      technical_skills: z.array(technicalSkillGroupSchema),
      achievements_and_languages: z.array(achievementSchema),
    }),
  }),
})

export type CvContent = z.infer<typeof cvSchema>
