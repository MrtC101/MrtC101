import type { ReactNode } from 'react'

// Content only ever uses two markdown features: **bold** and [text](url).
const TOKEN_RE = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const [, bold, linkText, linkHref] = match
    if (bold !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {bold}
        </strong>
      )
    } else {
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          {linkText}
        </a>
      )
    }

    lastIndex = TOKEN_RE.lastIndex
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}
