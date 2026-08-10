import type { Lang } from '@/lib/parser'

export const sectionTitles: Record<Lang, Record<string, string>> = {
  en: {
    profile: 'Summary',
    experience: 'Experience',
    education: 'Education',
    technical_skills: 'Technical Skills',
    achievements_and_languages: 'Achievements and Languages',
  },
  es: {
    profile: 'Perfil',
    experience: 'Experiencia Laboral',
    education: 'Educación',
    technical_skills: 'Habilidades Técnicas',
    achievements_and_languages: 'Logros e Idiomas',
  },
}

// Index 0 = lowest confidence level, index 2 = highest.
export const proficiencyLevels: Record<Lang, [string, string, string]> = {
  en: ['Limited confidence', 'Moderate confidence', 'High confidence'],
  es: ['Poca confianza', 'Confianza moderada', 'Muy confiado'],
}

export const ui = {
  en: {
    langToggle: 'Español',
    downloadCv: 'Download CV',
    viewProject: 'View Project',
    builtWithClaude: 'Built with',
    languageConfidenceNote: 'Working confidence, not memorized syntax.',
  },
  es: {
    langToggle: 'English',
    downloadCv: 'Descargar CV',
    viewProject: 'Ver Proyecto',
    builtWithClaude: 'Hecho con',
    languageConfidenceNote: 'Confianza de trabajo, no memorización de sintaxis.',
  },
} satisfies Record<Lang, Record<string, string>>
