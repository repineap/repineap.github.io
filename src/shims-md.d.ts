declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component

  export const frontmatter: {
    title?: string
    blurb?: string
    tags?: string[]
    live?: string
    source?: string
    image?: string
    order?: number
    [key: string]: unknown
  }
}
