import { Mail, MapPin } from '@lucide/vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'

export const getNavLinks = (lang = 'en') => [
  { href: '#about', label: lang === 'it' ? 'Chi Sono' : 'About' },
  { href: '#skills', label: lang === 'it' ? 'Competenze' : 'Skills' },
  { href: '#projects', label: lang === 'it' ? 'Progetti' : 'Projects' },
  { href: '#contact', label: lang === 'it' ? 'Contatti' : 'Contact' },
]

export const getContactMethods = (lang = 'en') => [
  {
    icon: Mail,
    title: 'Email',
    value: 'simone.maccario04@gmail.com',
    link: 'mailto:simone.maccario04@gmail.com',
    description:
      lang === 'it' ? 'Inviami un’email in qualsiasi momento' : 'Drop me an email anytime',
  },
  {
    icon: GitHubIcon,
    title: 'GitHub',
    value: 'github.com/simo-macca',
    link: 'https://github.com/simo-macca',
    description: lang === 'it' ? 'Esplora i miei repository' : 'Check out my repositories',
  },
  {
    icon: LinkedinIcon,
    title: 'LinkedIn',
    value: 'linkedin.com/in/simone-maccario-70a339362',
    link: 'https://www.linkedin.com/in/simone-maccario-70a339362/',
    description: lang === 'it' ? 'Connettiamoci professionalmente' : 'Let’s connect professionally',
  },
  {
    icon: MapPin,
    title: lang === 'it' ? 'Posizione' : 'Location',
    value: lang === 'it' ? 'Zurigo, Svizzera' : 'Zurich, Switzerland',
    link: 'https://maps.google.com/?q=ETH+Zurich',
    description:
      lang === 'it' ? 'Studente di Master all’ETH di Zurigo' : 'Master Student at ETH Zurich',
  },
]

export const navLinks = getNavLinks('en')
export const contactMethods = getContactMethods('en')
