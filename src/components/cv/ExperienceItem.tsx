import type { Lang } from '@/lib/parser'
import type { CvContent } from '@/types/schema'
import { formatDateRange, formatDuration } from '@/lib/date'
import { renderInline } from '@/lib/markdown'
import { TimelineEntry } from '@/components/cv/TimelineEntry'
import { SkillBadge } from '@/components/cv/SkillBadge'
import { LOGOS } from '@/lib/logos'
import { GALLERIES } from '@/lib/gallery'

type ExperienceEntry = CvContent['cv']['sections']['experience'][number]

export function ExperienceItem({ entry, lang }: { entry: ExperienceEntry; lang: Lang }) {
  const duration = formatDuration(entry.start_date, entry.end_date, lang)
  const logo = entry.logo ? LOGOS[entry.logo] : undefined
  const gallery = entry.gallery ? GALLERIES[entry.gallery] : undefined

  return (
    <TimelineEntry>
      <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <h3 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
          {logo && (
            <img
              src={logo}
              alt=""
              className="size-6 shrink-0 rounded-md border border-border object-cover"
            />
          )}
          {renderInline(entry.company)}
          <span className="font-normal text-muted-foreground">· {entry.position}</span>
        </h3>
        <span className="shrink-0 text-sm text-muted-foreground">
          {formatDateRange(entry.start_date, entry.end_date, lang)}
        </span>
      </div>

      {duration && <p className="mb-2 text-sm text-muted-foreground">{duration}</p>}

      {entry.stack && (
        <div className="mb-3 flex flex-wrap gap-2">
          {entry.stack.split(', ').map((skill) => (
            <SkillBadge key={skill} label={skill} size="sm" />
          ))}
        </div>
      )}

      <p className="mb-3 leading-relaxed text-foreground/80">{renderInline(entry.summary)}</p>

      <ul className="space-y-1.5">
        {entry.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 leading-relaxed text-foreground/80">
            <span className="mt-1 text-primary">•</span>
            <span>{renderInline(highlight)}</span>
          </li>
        ))}
      </ul>

      {gallery && gallery.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {gallery.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className="aspect-square w-full border border-border object-cover"
            />
          ))}
        </div>
      )}
    </TimelineEntry>
  )
}
