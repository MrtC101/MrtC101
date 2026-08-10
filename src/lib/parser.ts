import { cvSchema, type CvContent } from '@/types/schema'
import cvEnRaw from '@/assets/cv_en.yaml'
import cvEsRaw from '@/assets/cv_es.yaml'

export type Lang = 'en' | 'es'

type CanonicalSection =
  | 'profile'
  | 'experience'
  | 'education'
  | 'technical_skills'
  | 'achievements_and_languages'

// rendercv renders each `cv.sections` key as the section's PDF heading, so the YAML
// keeps them localized. This maps each language's heading back to the fixed key
// our schema/UI relies on.
const sectionKeyByLang: Record<Lang, Record<string, CanonicalSection>> = {
  en: {
    profile: 'profile',
    experience: 'experience',
    education: 'education',
    technical_skills: 'technical_skills',
    achievements_and_languages: 'achievements_and_languages',
  },
  es: {
    perfil: 'profile',
    experiencia_laboral: 'experience',
    educación: 'education',
    habilidades_técnicas: 'technical_skills',
    logros_y_idiomas: 'achievements_and_languages',
  },
}

function withCanonicalSectionKeys(raw: unknown, lang: Lang): unknown {
  if (typeof raw !== 'object' || raw === null || !('cv' in raw)) return raw
  const cv = raw.cv
  if (typeof cv !== 'object' || cv === null || !('sections' in cv)) return raw
  const sections = cv.sections
  if (typeof sections !== 'object' || sections === null) return raw

  const sectionKeys = sectionKeyByLang[lang]
  const canonicalSections = Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [sectionKeys[key] ?? key, value])
  )

  return { ...raw, cv: { ...cv, sections: canonicalSections } }
}

const rawByLang: Record<Lang, unknown> = {
  en: cvEnRaw,
  es: cvEsRaw,
}

export function parseContent(lang: Lang) {
  return cvSchema.safeParse(withCanonicalSectionKeys(rawByLang[lang], lang))
}

export type { CvContent }
