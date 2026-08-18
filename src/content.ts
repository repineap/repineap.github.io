import type { Component } from 'vue'

/**
 * Projects and interests are both "one markdown file per entry": the
 * frontmatter is the card, the body is the detail page. Adding an entry is
 * adding a file — there is no index to keep in sync.
 */
export interface Entry {
  /** URL slug — the markdown filename without its extension. */
  slug: string
  title: string
  /** One or two sentences, shown on the card. */
  blurb: string
  tags: string[]
  /** Optional. The card only shows a link when the field is set. */
  live?: string
  source?: string
  /** Build-hashed URL of the card image, or the shared placeholder. */
  image: string
  /** Ascending. Entries without one sort last, then alphabetically. */
  order: number
}

type Frontmatter = {
  title?: string
  blurb?: string
  tags?: string[]
  live?: string
  source?: string
  image?: string
  order?: number
}

type Loader = () => Promise<{ default: Component }>

/** Vite needs literal glob patterns, so each collection declares its own. */
const globs = {
  projects: {
    meta: import.meta.glob<Frontmatter>('./content/projects/*.md', {
      eager: true,
      import: 'frontmatter',
    }),
    body: import.meta.glob<{ default: Component }>('./content/projects/*.md'),
    images: import.meta.glob<string>('./assets/projects/*', {
      eager: true,
      import: 'default',
      query: '?url',
    }),
  },
  interests: {
    meta: import.meta.glob<Frontmatter>('./content/interests/*.md', {
      eager: true,
      import: 'frontmatter',
    }),
    body: import.meta.glob<{ default: Component }>('./content/interests/*.md'),
    images: import.meta.glob<string>('./assets/interests/*', {
      eager: true,
      import: 'default',
      query: '?url',
    }),
  },
} as const

const placeholder = new URL('./assets/placeholder.svg', import.meta.url).href

export type CollectionName = keyof typeof globs

function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}

function build(name: CollectionName): { entries: Entry[]; loaders: Record<string, Loader> } {
  const { meta, body, images } = globs[name]

  const byFilename = new Map(Object.entries(images).map(([path, url]) => [basename(path), url]))

  const entries = Object.entries(meta)
    .map(([path, fm]): Entry => {
      const slug = basename(path).replace(/\.md$/, '')
      return {
        slug,
        title: fm?.title ?? slug,
        blurb: fm?.blurb ?? '',
        tags: fm?.tags ?? [],
        live: fm?.live,
        source: fm?.source,
        image: (fm?.image && byFilename.get(fm.image)) || placeholder,
        order: fm?.order ?? Number.MAX_SAFE_INTEGER,
      }
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

  const loaders = Object.fromEntries(
    Object.entries(body).map(([path, loader]) => [basename(path).replace(/\.md$/, ''), loader]),
  )

  return { entries, loaders }
}

const collections = {
  projects: build('projects'),
  interests: build('interests'),
}

export const projects = collections.projects.entries
export const interests = collections.interests.entries

export function entryBySlug(name: CollectionName, slug: string): Entry | undefined {
  return collections[name].entries.find((e) => e.slug === slug)
}

export function bodyLoader(name: CollectionName, slug: string): Loader | undefined {
  return collections[name].loaders[slug]
}

/** Prev and next in display order, for the detail-page pager. */
export function adjacent(name: CollectionName, slug: string): { prev?: Entry; next?: Entry } {
  const list = collections[name].entries
  const i = list.findIndex((e) => e.slug === slug)
  if (i === -1) return {}
  return { prev: list[i - 1], next: list[i + 1] }
}
