import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useInView } from '@/lib/useInView'

export function TimelineEntry({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={cn(
        "relative pl-6 before:absolute before:top-1.5 before:left-0 before:size-2 before:bg-primary before:shadow-[0_0_10px_var(--primary)] before:content-['']",
        !inView && 'motion-safe:opacity-0',
        inView &&
          'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-forwards motion-safe:duration-500 motion-safe:ease-out',
        className
      )}
    >
      {children}
    </div>
  )
}
