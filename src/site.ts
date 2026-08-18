/** Single source of truth for identity, taglines and contact links. */

export const site = {
  name: 'Andrew Repine',
  /** TODO: replace with your own one-liner. */
  tagline: 'Software engineer — TODO: your one-line tagline goes here.',
  url: 'https://repineap.github.io',
} as const

/**
 * Split so the address is not a literal `mailto:` string in the shipped HTML.
 * Scrapers that do not run JavaScript see nothing to harvest.
 */
const emailUser = 'andrewrepine0'
const emailHost = 'gmail.com'

export const email = `${emailUser}@${emailHost}`
export const emailHref = `mailto:${emailUser}@${emailHost}`

export const links = [
  { label: 'GitHub', href: 'https://github.com/repineap' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-repine-76a649217/' },
  { label: 'Email', href: emailHref },
] as const
