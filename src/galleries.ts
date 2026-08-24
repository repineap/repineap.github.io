/**
 * Photo galleries are folders. Drop images in
 * `src/assets/galleries/<name>/` and a markdown body can slide through them
 * with `<PhotoGallery folder="<name>" />` — there is no index to keep in sync
 * and no per-image frontmatter.
 */
export interface Slide {
  /** Source path. Unique per file, so it is a safe list key. */
  id: string
  /** Build-hashed URL of the image. */
  src: string
  /** Alt text derived from the filename: `01-salt-mine.jpg` → "salt mine". */
  alt: string
}

/**
 * Restricted to image extensions so a `.gitkeep` or a note left beside the
 * photos never becomes a slide.
 */
const files = import.meta.glob<string>('./assets/galleries/*/*.{jpg,jpeg,png,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
  query: '?url',
})

/** Leading digits are ordering, not description, so they drop out of the alt. */
function altFromPath(path: string): string {
  return path
    .slice(path.lastIndexOf('/') + 1)
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

const byFolder = new Map<string, Slide[]>()

for (const [path, src] of Object.entries(files)) {
  const folder = path.split('/').at(-2) ?? ''
  const list = byFolder.get(folder) ?? []
  list.push({ id: path, src, alt: altFromPath(path) })
  byFolder.set(folder, list)
}

// Filenames are the running order. Numeric-aware, so `2.jpg` precedes `10.jpg`.
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
for (const list of byFolder.values()) {
  list.sort((a, b) => collator.compare(a.id, b.id))
}

export function gallery(folder: string): Slide[] {
  return byFolder.get(folder) ?? []
}
