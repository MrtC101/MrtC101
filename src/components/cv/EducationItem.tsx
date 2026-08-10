import type { Lang } from '@/lib/parser'
import type { CvContent } from '@/types/schema'
import { formatDateRange } from '@/lib/date'
import { TimelineEntry } from '@/components/cv/TimelineEntry'

type EducationEntry = CvContent['cv']['sections']['education'][number]

export function EducationItem({ entry, lang }: { entry: EducationEntry; lang: Lang }) {
  return (
    <TimelineEntry className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{entry.institution}</h3>
        <p className="text-foreground/80">
          {entry.area}
          <span className="text-muted-foreground"> · {entry.study_type}</span>
        </p>
      </div>
      <span className="shrink-0 text-sm text-muted-foreground">
        {formatDateRange(entry.start_date, entry.end_date, lang)}
      </span>
    </TimelineEntry>
  )
}
