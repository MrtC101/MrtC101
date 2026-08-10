import claudeWordmark from '@/assets/claude-ai-wordmark.svg'

export function BuiltWithClaude({ label }: { label: string }) {
  return (
    <a
      href="https://claude.com"
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 opacity-40 grayscale transition-[opacity,filter] hover:opacity-90 hover:grayscale-0"
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <img src={claudeWordmark} alt="Claude" className="h-3 w-auto" />
    </a>
  )
}
