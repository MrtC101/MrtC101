import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Auto-registry: every SVG dropped into src/assets becomes selectable by
// filename (lowercased, no extension) — no manual list to keep in sync.
const iconModules = import.meta.glob('../assets/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => [
    path.replace(/^.*\//, '').replace(/\.svg$/, '').toLowerCase(),
    url,
  ])
)

// Filenames whose correct casing naive title-casing can't produce.
const LABEL_OVERRIDES: Record<string, string> = {
  'c-plusplus': 'C++',
  'tailwind-css': 'Tailwind CSS',
  'azure-sql-server': 'Azure SQL Server',
  'scikit-learn': 'scikit-learn',
  'github-dark': 'GitHub',
  'claude-ai-wordmark': 'Claude',
  postgresql: 'PostgreSQL',
  fastapi: 'FastAPI',
  nvidia: 'NVIDIA',
  sqlite: 'SQLite',
  gstreamer: 'GStreamer',
  mariadb: 'MariaDB',
  mongodb: 'MongoDB',
  opencv: 'OpenCV',
  numpy: 'NumPy',
  pytorch: 'PyTorch',
  typescript: 'TypeScript',
  nginx: 'NGINX',
  linkedin: 'LinkedIn',
  genexus: 'GeneXus',
}

function labelFor(slug: string) {
  return (
    LABEL_OVERRIDES[slug] ??
    slug
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  )
}

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-none border border-border bg-background font-medium transition-colors [&_img]:shrink-0 hover:border-primary hover:text-primary',
  {
    variants: {
      size: {
        default: 'h-8 px-2.5 text-xs [&_img]:size-4',
        sm: 'h-6 px-2 text-[11px] [&_img]:size-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface TechBadgeProps extends VariantProps<typeof badgeVariants> {
  label: string
  icon?: string
  className?: string
}

// Single source of the icon+label pill markup, shared by Stack (known icon
// slugs, e.g. the header) and SkillBadge (free-text labels resolved against
// SKILL_ICON_SLUGS, e.g. technical skills and per-experience stacks). Always
// renders the label, with or without an icon — never disappears silently.
function TechBadge({ label, icon, size, className }: TechBadgeProps) {
  return (
    <span className={cn(badgeVariants({ size }), className)}>
      {icon && <img src={icon} alt="" />}
      {label}
    </span>
  )
}

interface StackProps extends VariantProps<typeof badgeVariants> {
  items: string[]
  className?: string
}

function Stack({ items, size, className }: StackProps) {
  return (
    <div data-slot="stack" className={cn('flex flex-wrap gap-2', className)}>
      {items.map((slug) => {
        const icon = ICONS[slug]
        if (!icon && import.meta.env.DEV) {
          console.warn(`Stack: no icon found for "${slug}" in src/assets`)
        }
        return <TechBadge key={slug} label={labelFor(slug)} icon={icon} size={size} />
      })}
    </div>
  )
}

export { ICONS, badgeVariants, TechBadge, Stack }
