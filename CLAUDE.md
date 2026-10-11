# repineap.github.io

Andrew Repine's portfolio. A Vue 3 + Vite site on GitHub Pages.

## Invariants

- Use pnpm. Do not use npm or yarn. Do not commit `package-lock.json`.
- Use `make dev`, `make build`, `make preview` to run the project.
- Adding a project or an interest must stay a one-Markdown-file operation.
  Do not add an index file or a build step to that workflow.
- `src/content.ts` derives both collections from `import.meta.glob` over
  `src/content/projects/*.md` and `src/content/interests/*.md`. Frontmatter
  is the card. The body is the detail page.
- Card images live in `src/assets/<collection>/`. Frontmatter names the file.
  An unknown or absent name falls back to `src/assets/placeholder.svg`.
- A photo gallery is a folder. Put images in
  `src/assets/galleries/<name>/` and write `<PhotoGallery folder="<name>" />`
  in a Markdown body. Filenames are the running order. Do not add a manifest.
- Markdown bodies compile without imports. Register any component a body uses
  globally in `src/main.ts`.
- Links written in Markdown open in a new tab. `markdownItSetup` in
  `vite.config.ts` adds `target` and `rel`. Site-relative paths (`/about`) and
  in-page anchors (`#section`) are exempt, because a new tab breaks them.
- The home page is the project list. `/projects` redirects to `/`. Project
  detail pages stay at `/projects/<slug>`.
- `src/content/top-of-mind.md` holds the Top of Mind line on the home page.
- The site is light only. There is no dark theme and no theme toggle.
- Colours, type and layout come from `src/styles/tokens.css`. Add a token
  before you add a hard-coded colour.
- The palette is warm newsprint and black ink. There is no accent colour.
- No image shows in its own colours. `--image-tone` in `tokens.css` gives
  every image that is not dithered one warm sepia tone.
- A link is ink with a permanent underline. A headline link shows its
  underline on hover only.
- Projects and interests share one card, `src/components/EntryCard.vue`. A
  card shows a dithered image, a title and a blurb. Tags and links show on the
  detail page only.
- `src/components/DitherCanvas.vue` dithers each card image in the browser
  with the Atkinson method. Do not add an image pipeline. Only card images are
  dithered. Hero, prose and gallery images use `--image-tone`.
- Images are plain rectangles. Do not round the corners of a card image, a
  hero image or a prose image.
- Every card image is cropped to 16:9.
- `src/components/SiteBackground.vue` is the single hook for the page
  background. The background is flat paper. Do not add a wash, a texture or
  an animation.
- The site deploys to GitHub Pages from `main` via
  `.github/workflows/deploy.yml`. `base` in `vite.config.ts` is `/` because
  this is a user site. Keep the two in agreement.
- `dist/404.html` is a copy of `dist/index.html`. History-mode routing needs
  it. Keep the copy step in the build script.
- Placeholder copy is marked `TODO` and styled by the `.todo` class. Do not
  invent biography, employers or dates to replace it.
