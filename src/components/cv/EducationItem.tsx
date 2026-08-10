import type { Lang } from '@/lib/parser'
import type { CvContent } from '@/types/schema'
import { formatDateRange } from '@/lib/date'
import { TimelineEntry } from '@/components/cv/TimelineEntry'
import { LOGOS } from '@/lib/logos'

type EducationEntry = CvContent['cv']['sections']['education'][number]

export function EducationItem({ entry, lang }: { entry: EducationEntry; lang: Lang }) {
  const logo = entry.logo ? LOGOS[entry.logo] : undefined

  return (
    <TimelineEntry>
      <h4 className="flex items-center gap-2.5 font-semibold text-foreground">
        {logo && (
          <img
            src={logo}
            alt=""
            className="size-6 shrink-0 rounded-md border border-border object-cover"
          />
        )}
        {entry.institution}
      </h4>
      <p className="mt-1 text-sm text-foreground/80">{entry.area}</p>
      <p className="text-xs text-muted-foreground">{entry.study_type}</p>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {formatDateRange(entry.start_date, entry.end_date, lang)}
      </p>
    </TimelineEntry>
  )
}
