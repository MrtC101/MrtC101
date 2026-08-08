import { cvSchema, type CvContent } from '@/types/schema'
import cvEnRaw from '@/assets/cv_en.yaml'
import cvEsRaw from '@/assets/cv_es.yaml'

export type Lang = 'en' | 'es'

const rawByLang: Record<Lang, unknown> = {
  en: cvEnRaw,
  es: cvEsRaw,
}

export function parseContent(lang: Lang) {
  return cvSchema.safeParse(rawByLang[lang])
}

export type { CvContent }
