/** Single source of truth for identity, taglines and contact links. */

export const site = {
  name: 'Andrew Repine',
  tagline: 'Software engineer, data lover, greek food enthusiast, hockey fan.',
  url: 'https://repineap.github.io',
} as const

const emailUser = 'andrewrepine0'
const emailHost = 'gmail.com'

export const email = `${emailUser}@${emailHost}`
export const emailHref = `mailto:${emailUser}@${emailHost}`

export const links = [
  { label: 'GitHub', href: 'https://github.com/repineap' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-repine-76a649217/' },
  { label: 'Email', href: emailHref },
] as const
