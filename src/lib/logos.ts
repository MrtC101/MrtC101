// Auto-registry: every JPG dropped into src/assets becomes selectable by
// filename (lowercased, no extension) — same pattern as the icon registry
// in src/components/cv/Stack.tsx, no manual list to keep in sync.
const logoModules = import.meta.glob('../assets/*.jpg', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const LOGOS: Record<string, string> = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [
    path.replace(/^.*\//, '').replace(/\.jpg$/, '').toLowerCase(),
    url,
  ])
)
