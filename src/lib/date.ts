import type { Lang } from '@/lib/parser'

const MONTH_YEAR_RE = /^(\d{4})-(\d{2})$/

function parseYearMonth(value: string | number): { year: number; month: number } | null {
  if (typeof value === 'number') return { year: value, month: 1 }
  const match = MONTH_YEAR_RE.exec(value)
  if (!match) return null
  return { year: Number(match[1]), month: Number(match[2]) }
}

export function formatDate(value: string | number, lang: Lang): string {
  if (typeof value === 'string' && value.toLowerCase() === 'present') {
    return lang === 'es' ? 'Presente' : 'Present'
  }

  const parsed = parseYearMonth(value)
  if (!parsed) return String(value)
  if (typeof value === 'number') return String(value)

  return new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(parsed.year, parsed.month - 1))
}

export function formatDateRange(start: string | number, end: string | number, lang: Lang): string {
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`
}

export function formatDuration(start: string, end: string, lang: Lang): string | null {
  const startParsed = parseYearMonth(start)
  if (!startParsed) return null

  const now = new Date()
  const endParsed =
    end.toLowerCase() === 'present'
      ? { year: now.getFullYear(), month: now.getMonth() + 1 }
      : parseYearMonth(end)
  if (!endParsed) return null

  let totalMonths =
    (endParsed.year - startParsed.year) * 12 + (endParsed.month - startParsed.month) + 1
  if (totalMonths < 1) totalMonths = 1

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const parts: string[] = []
  if (lang === 'es') {
    if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`)
    if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`)
  } else {
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }

  return parts.length > 0 ? parts.join(' ') : null
}
