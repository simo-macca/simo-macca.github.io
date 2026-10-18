import { Mail, MapPin } from '@lucide/vue'
import GitHubComponent from '@/components/GitHubComponent.vue'
import LinkedinComponent from '@/components/LinkedinComponent.vue'

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'simone.maccario04@gmail.com',
    link: 'mailto:simone.maccario04@gmail.com',
    description: 'Drop me an email anytime',
  },
  {
    icon: GitHubComponent,
    title: 'GitHub',
    value: 'github.com/simo-macca',
    link: 'https://github.com/simo-macca',
    description: 'Check out my repositories',
  },
  {
    icon: LinkedinComponent,
    title: 'LinkedIn',
    value: 'linkedin.com/in/simone-maccario-70a339362',
    link: 'https://www.linkedin.com/in/simone-maccario-70a339362/',
    description: "Let's connect professionally",
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Zurich, Switzerland',
    link: 'https://maps.google.com/?q=ETH+Zurich',
    description: 'Master Student at ETH Zurich',
  },
]
