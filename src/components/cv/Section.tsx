import type { ReactNode } from 'react'

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-border py-10 first:pt-0 last:border-b-0 md:py-12">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {title}
      </h2>
      {children}
    </section>
  )
}
