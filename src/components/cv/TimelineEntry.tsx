import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function TimelineEntry({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative pl-6 before:absolute before:top-1.5 before:left-0 before:size-2 before:bg-primary before:shadow-[0_0_10px_var(--primary)] before:content-['']",
        className
      )}
    >
      {children}
    </div>
  )
}
