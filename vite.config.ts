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
      markdownItSetup(md) {
        // A link written in Markdown points off this site, so open it in a new
        // tab. Site-relative paths and in-page anchors are left alone: those
        // are navigation, and a new tab would break them.
        const renderToken: typeof md.renderer.rules.link_open = (t, i, o, _env, self) =>
          self.renderToken(t, i, o)
        const base = md.renderer.rules.link_open ?? renderToken

        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          const href = tokens[idx].attrGet('href') ?? ''
          if (!href.startsWith('/') && !href.startsWith('#')) {
            tokens[idx].attrSet('target', '_blank')
            tokens[idx].attrSet('rel', 'noopener noreferrer')
          }
          return base(tokens, idx, options, env, self)
        }
      },
    }),
  ],
})
