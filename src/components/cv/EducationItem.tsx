import type { Lang } from '@/lib/parser'
import type { CvContent } from '@/types/schema'
import { formatDateRange } from '@/lib/date'
import { TimelineEntry } from '@/components/cv/TimelineEntry'

type EducationEntry = CvContent['cv']['sections']['education'][number]

export function EducationItem({ entry, lang }: { entry: EducationEntry; lang: Lang }) {
  return (
    <TimelineEntry>
      <h4 className="font-semibold text-foreground">{entry.institution}</h4>
      <p className="mt-1 text-sm text-foreground/80">{entry.area}</p>
      <p className="text-xs text-muted-foreground">{entry.study_type}</p>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {formatDateRange(entry.start_date, entry.end_date, lang)}
      </p>
    </TimelineEntry>
  )
}
