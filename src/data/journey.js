import { Briefcase, GraduationCap } from '@lucide/vue'

/**
 * Education and experience timeline shown in the About section (newest first).
 * `type` is 'education' | 'experience'. Translatable fields use `{ en, it }`.
 */
export const journey = Object.freeze([
  {
    id: 'eth-msc',
    type: 'education',
    icon: GraduationCap,
    period: { en: 'Sep 2026 – present', it: 'Set 2026 – oggi' },
    title: { en: 'MSc in Computer Science', it: 'MSc in Computer Science' },
    organization: { en: 'ETH Zurich', it: 'ETH Zurigo' },
    detail: {
      en: 'Major in Data Management & Machine Intelligence.',
      it: 'Specializzazione in Data Management & Machine Intelligence.',
    },
  },
  {
    id: 'brightside',
    type: 'experience',
    icon: Briefcase,
    period: { en: 'Sep 2025 – Dec 2025', it: 'Set 2025 – Dic 2025' },
    title: { en: 'Data Engineering Intern', it: 'Data Engineering Intern' },
    organization: { en: 'Brightside Capital, Lugano', it: 'Brightside Capital, Lugano' },
    detail: {
      en: 'Python automation to import, map, validate and export banking data from AWS into the internal schema.',
      it: 'Automazione in Python per importare, mappare, validare ed esportare dati bancari da AWS nello schema interno.',
    },
  },
  {
    id: 'usi-bsc',
    type: 'education',
    icon: GraduationCap,
    period: { en: 'Sep 2023 – Jun 2026', it: 'Set 2023 – Giu 2026' },
    title: {
      en: 'BSc in Informatics · magna cum laude',
      it: 'Laurea in Informatica · magna cum laude',
    },
    organization: {
      en: 'Università della Svizzera italiana (USI)',
      it: 'Università della Svizzera italiana (USI)',
    },
    detail: {
      en: 'Thesis: an interactive analytics dashboard for PyTamaro-Web.',
      it: 'Tesi: una dashboard di analisi interattiva per PyTamaro-Web.',
    },
  },
])
