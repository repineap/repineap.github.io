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
- Links written in Markdown open in a new tab. `markdownItSetup` in
  `vite.config.ts` adds `target` and `rel`. Site-relative paths (`/about`) and
  in-page anchors (`#section`) are exempt, because a new tab breaks them.
- The site is dark only. There is no light theme and no theme toggle.
- Colours, type and layout come from `src/styles/tokens.css`. Add a token
  before you add a hard-coded colour.
- The accent is amber. The palette otherwise matches the heatmap-weekly
  project, which is the design source.
- Project cards are flat and editorial. Interest cards are framed and glossy.
  Keep the two treatments distinct.
- Every card image is cropped to 16:9.
- `src/components/SiteBackground.vue` is the single hook for the page
  background. The wash is static. Do not animate it.
- The site deploys to GitHub Pages from `main` via
  `.github/workflows/deploy.yml`. `base` in `vite.config.ts` is `/` because
  this is a user site. Keep the two in agreement.
- `dist/404.html` is a copy of `dist/index.html`. History-mode routing needs
  it. Keep the copy step in the build script.
- Placeholder copy is marked `TODO` and styled by the `.todo` class. Do not
  invent biography, employers or dates to replace it.
