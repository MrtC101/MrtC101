import { ICONS } from '@/components/Stack'
import { SKILL_ICON_SLUGS } from '@/lib/skills'
import { languageProficiency } from '@/lib/languageProficiency'
import { cn } from '@/lib/utils'

const SEGMENTS = [1, 2, 3] as const

export function LanguageProficiency({
  languages,
  levelLabels,
  note,
}: {
  languages: string[]
  levelLabels: [string, string, string]
  note: string
}) {
  return (
    <div>
      <p className="mb-2.5 text-xs text-muted-foreground">{note}</p>
      <div className="space-y-2.5">
        {languages.map((name) => {
          const level = languageProficiency[name] ?? 1
          const slug = SKILL_ICON_SLUGS[name]
          const icon = slug ? ICONS[slug] : undefined

          return (
            <div key={name} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm text-foreground">
                {icon && <img src={icon} alt="" className="size-4" />}
                {name}
              </span>
              <div className="flex gap-1" role="img" aria-label={`${name}: ${levelLabels[level - 1]}`}>
                {SEGMENTS.map((segment) => (
                  <span
                    key={segment}
                    className={cn('h-1.5 w-6', segment <= level ? 'bg-primary' : 'bg-muted')}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
