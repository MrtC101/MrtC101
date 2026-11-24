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

export const ui = {
  en: {
    langToggle: 'Español',
    downloadCv: 'Download CV',
    viewProject: 'View Project',
    builtWithClaude: 'Built with',
  },
  es: {
    langToggle: 'English',
    downloadCv: 'Descargar CV',
    viewProject: 'Ver Proyecto',
    builtWithClaude: 'Hecho con',
  },
} satisfies Record<Lang, Record<string, string>>
