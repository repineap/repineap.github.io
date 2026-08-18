# repineap.github.io

Andrew Repine's portfolio. A Vue 3 + Vite site deployed to GitHub Pages at
[repineap.github.io](https://repineap.github.io).

## Getting started

```sh
make dev
```

Requires [pnpm](https://pnpm.io). Other targets:

```sh
make build    # type-check and build to dist/
make preview  # preview the production build
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Masthead: name, tagline, short intro, contact links |
| `/about` | Bio, work experience, education — `src/content/about.md` |
| `/projects` | Card grid; each card opens `/projects/:slug` |
| `/interests` | Photo grid; each card opens `/interests/:slug` |

## Adding a project or an interest

1. Add one Markdown file to `src/content/projects/` or
   `src/content/interests/`. The filename becomes the URL slug.
2. Fill in the frontmatter. The card reads it; the body is the detail page.
3. Drop the image beside it in `src/assets/projects/` or
   `src/assets/interests/` and set `image:` to the filename.

```yaml
---
title: NHL Game Display
blurb: One or two sentences, shown on the card.
tags: [Vue 3, TypeScript]     # optional
live: https://example.com     # optional — the card links it only if set
source: https://github.com/…  # optional
image: hockey-website.svg     # optional — falls back to a placeholder
order: 2                      # ascending; entries without one sort last
---
```

No index to update. `src/content.ts` globs both directories at build time.

## Editing text

- Name, tagline and contact links: `src/site.ts`.
- About page: `src/content/about.md`.
- Everything still marked `TODO` is placeholder copy waiting on real content.

## Stack

- Vue 3 + Vite, TypeScript
- `unplugin-vue-markdown` — Markdown files are Vue components
- vue-router, history mode (`dist/404.html` is a copy of `index.html`)
- Deployed by `.github/workflows/deploy.yml` on push to `main`
