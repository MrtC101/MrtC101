import { ICONS, TechBadge, type badgeVariants } from '@/components/cv/Stack'
import { SKILL_ICON_SLUGS } from '@/lib/skills'
import type { VariantProps } from 'class-variance-authority'

type SkillBadgeProps = { label: string } & VariantProps<typeof badgeVariants>

export function SkillBadge({ label, size }: SkillBadgeProps) {
  const slug = SKILL_ICON_SLUGS[label]
  const icon = slug ? ICONS[slug] : undefined

  return <TechBadge label={label} icon={icon} size={size} />
}
