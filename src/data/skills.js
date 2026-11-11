import { BrainCircuit, CodeXml, Database, Terminal } from '@lucide/vue'

/**
 * Technical skills, grouped in four categories.
 * Translatable fields use `{ en, it }`; resolve them with `languageStore.localized()`.
 */
export const skillCategories = Object.freeze([
  {
    id: 'backend',
    icon: Database,
    topic: { en: 'Back End & Data', it: 'Back End & Dati' },
    description: {
      en: 'Languages, databases and frameworks for services and data processing.',
      it: 'Linguaggi, database e framework per servizi ed elaborazione dei dati.',
    },
    skills: [
      'Python',
      'Java',
      'SQL',
      { en: 'PostgreSQL (schema design, CTEs)', it: 'PostgreSQL (schema design, CTE)' },
      'Spring Boot',
      'FastAPI',
      { en: 'REST APIs', it: 'API REST' },
      'AWS',
      'C / C++',
    ],
  },
  {
    id: 'intelligence',
    icon: BrainCircuit,
    topic: { en: 'Data, Search & Reasoning', it: 'Dati, Ricerca & Ragionamento' },
    description: {
      en: 'Turning raw data into insight: pipelines, code analysis, retrieval and SAT encodings.',
      it: 'Trasformare dati grezzi in insight: pipeline, analisi del codice, retrieval e codifiche SAT.',
    },
    skills: [
      { en: 'Data Pipelines', it: 'Pipeline di Dati' },
      { en: 'Static Code Analysis', it: 'Analisi Statica del Codice' },
      'Information Retrieval',
      'Apache Solr & Carrot2',
      { en: 'SAT Encoding (PySAT)', it: 'Codifica SAT (PySAT)' },
      'Jupyter',
      'Racket',
    ],
  },
  {
    id: 'frontend',
    icon: CodeXml,
    topic: { en: 'Front End & UI', it: 'Front End & UI' },
    description: {
      en: 'Component-based, responsive and accessible user interfaces.',
      it: 'Interfacce utente a componenti, responsive e accessibili.',
    },
    skills: [
      'React',
      'Vue 3 & Pinia',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Vite',
      'Bootstrap',
      'Jinja2',
    ],
  },
  {
    id: 'devops',
    icon: Terminal,
    topic: { en: 'DevOps & Testing', it: 'DevOps & Testing' },
    description: {
      en: 'Containers, CI/CD, automated testing and reproducible environments.',
      it: 'Container, CI/CD, test automatici e ambienti riproducibili.',
    },
    skills: [
      'Docker & Compose',
      'GitHub Actions',
      'Nginx',
      'Netlify',
      'Git & GitLab',
      'Linux & Bash',
      'Vitest · pytest · JUnit',
      'LaTeX',
    ],
  },
])
