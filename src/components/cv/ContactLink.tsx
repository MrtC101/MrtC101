import type { ReactNode } from 'react'
import type { Icon } from '@phosphor-icons/react'

type ContactLinkProps = {
  icon: Icon
  children: ReactNode
  href?: string
}

export function ContactLink({ icon: IconComponent, children, href }: ContactLinkProps) {
  const content = (
    <>
      <IconComponent size={16} className="shrink-0 text-primary" />
      <span>{children}</span>
    </>
  )

  const className = 'flex items-center gap-2 text-muted-foreground'

  if (!href) {
    return <div className={className}>{content}</div>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${className} transition-colors hover:text-primary`}
    >
      {content}
    </a>
  )
}
