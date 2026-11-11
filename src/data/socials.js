import { Mail, MapPin } from '@lucide/vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'

/**
 * Profile links and contact channels. Single source of truth for every URL
 * that appears in the header, footer and contact section.
 */

export const profileLinks = Object.freeze({
  email: 'simone.maccario04@gmail.com',
  github: 'https://github.com/simo-macca',
  linkedin: 'https://www.linkedin.com/in/simone-maccario/',
  site: 'https://simo-macca.github.io/',
})

/** In-page navigation. `labelKey` points into `t.nav`. */
export const navLinks = Object.freeze([
  { id: 'about', labelKey: 'about' },
  { id: 'skills', labelKey: 'skills' },
  { id: 'projects', labelKey: 'projects' },
  { id: 'contact', labelKey: 'contact' },
])

/** Brand icons shown in the footer. `ariaKey` points into `t.a11y`. */
export const socialLinks = Object.freeze([
  { id: 'github', href: profileLinks.github, icon: GitHubIcon, ariaKey: 'githubProfile' },
  { id: 'linkedin', href: profileLinks.linkedin, icon: LinkedinIcon, ariaKey: 'linkedinProfile' },
])

/**
 * Contact cards. `titleKey` / `valueKey` / `descriptionKey` point into
 * `t.contact.methods`; a literal `title` / `value` is used when no key is set.
 */
export const contactMethods = Object.freeze([
  {
    id: 'email',
    icon: Mail,
    title: 'Email',
    value: profileLinks.email,
    href: `mailto:${profileLinks.email}`,
    descriptionKey: 'email',
    external: false,
  },
  {
    id: 'github',
    icon: GitHubIcon,
    title: 'GitHub',
    value: 'github.com/simo-macca',
    href: profileLinks.github,
    descriptionKey: 'github',
    external: true,
  },
  {
    id: 'linkedin',
    icon: LinkedinIcon,
    title: 'LinkedIn',
    value: 'linkedin.com/in/simone-maccario',
    href: profileLinks.linkedin,
    descriptionKey: 'linkedin',
    external: true,
  },
  {
    id: 'location',
    icon: MapPin,
    titleKey: 'locationTitle',
    valueKey: 'locationValue',
    href: 'https://maps.google.com/?q=ETH+Zurich',
    descriptionKey: 'location',
    external: true,
  },
])
