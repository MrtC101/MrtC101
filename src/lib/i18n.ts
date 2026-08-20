import type { Lang } from '@/lib/parser'

export const sectionTitles: Record<Lang, Record<string, string>> = {
  en: {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    technical_skills: 'Technical Skills',
    awards: 'Awards',
    languages: 'Languages',
  },
  es: {
    summary: 'Resumen',
    experience: 'Experiencia Laboral',
    education: 'Educación',
    technical_skills: 'Habilidades Técnicas',
    awards: 'Premios',
    languages: 'Idiomas',
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
