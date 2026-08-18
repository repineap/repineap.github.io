import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages user site (repineap.github.io) serves from the domain root.
  base: '/',
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      wrapperClasses: 'prose',
      // No @unhead/vue in this project; keep the plugin from importing it.
      headEnabled: false,
      // The plugin only exports frontmatter keys individually (`export const title`),
      // which breaks `import.meta.glob(..., { import: 'frontmatter' })` and would fail
      // the build whenever a file omitted a key. Nesting the object under its own
      // `frontmatter` key makes the plugin emit `export const frontmatter = {...}` too,
      // so src/content.ts can read one cheap, tree-shakeable export per file.
      frontmatterPreprocess: (frontmatter) => ({
        head: {},
        frontmatter: { ...frontmatter, frontmatter },
      }),
    }),
  ],
})
