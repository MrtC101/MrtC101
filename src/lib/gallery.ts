// Auto-registry: thumbnails dropped into src/assets/gallery/<name>/ are
// grouped by folder name and referenced from the YAML via `gallery: <name>`.
// Generate thumbnails with tools/make-thumbs.sh.
const galleryModules = import.meta.glob('../assets/gallery/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const GALLERIES: Record<string, string[]> = {}

for (const [path, url] of Object.entries(galleryModules).sort(([a], [b]) => a.localeCompare(b))) {
  const name = path.split('/').at(-2)!.toLowerCase()
  ;(GALLERIES[name] ??= []).push(url as string)
}
