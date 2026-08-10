import type { ReactNode } from 'react'

export function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 border-t border-border pt-8">
      <h3 className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </div>
  )
}
