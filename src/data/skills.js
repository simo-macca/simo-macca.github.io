import { Database, Cpu, Code2, Terminal } from '@lucide/vue'

export const getSkillCategories = (lang = 'en') => [
  {
    id: 'systems',
    topic: lang === 'it' ? 'Piattaforme Dati & Sistemi' : 'Systems & Data Platforms',
    categoryIcon: Database,
    description:
      lang === 'it'
        ? 'Architettura interna dei motori dati, ottimizzazione query, storage distribuito e servizi backend transazionali.'
        : 'Data engine internals, query optimization, distributed storage, and transactional backend services.',
    skills:
      lang === 'it'
        ? [
            'PostgreSQL',
            'Apache Solr',
            'Ottimizzazione Query',
            'Sistemi Distribuiti',
            'Spring Boot',
            'Java',
            'C / C++',
            'API RESTful',
          ]
        : [
            'PostgreSQL',
            'Apache Solr',
            'Query Optimization',
            'Distributed Systems',
            'Spring Boot',
            'Java',
            'C / C++',
            'RESTful APIs',
          ],
  },
  {
    id: 'intelligence',
    topic:
      lang === 'it'
        ? 'Machine Intelligence & Matematica Applicata'
        : 'Machine Intelligence & Applied Math',
    categoryIcon: Cpu,
    description:
      lang === 'it'
        ? 'Recupero delle informazioni, riduzioni formali a risolutori SAT e modellazione algoritmica.'
        : 'Information retrieval, SAT solver formal reductions, and algorithmic modeling.',
    skills:
      lang === 'it'
        ? [
            'IR Multimodale',
            'Risolutori SAT',
            'Python',
            'Pandas & NumPy',
            'Analisi di Complessità',
            'Scrapy',
          ]
        : [
            'Multi-Modal IR',
            'SAT Solvers',
            'Python',
            'Pandas & NumPy',
            'Complexity Analysis',
            'Scrapy',
          ],
  },
  {
    id: 'frontend',
    topic: lang === 'it' ? 'Ingegneria Web Full-Stack' : 'Full-Stack Web Engineering',
    categoryIcon: Code2,
    description:
      lang === 'it'
        ? 'Architetture a componenti reattive moderne, interfacce utente accessibili e sincronizzazione dello stato.'
        : 'Modern reactive component architectures, accessible user interfaces, and state synchronization.',
    skills:
      lang === 'it'
        ? [
            'Vue 3 (Composition API)',
            'Pinia (State Store)',
            'TypeScript & JavaScript',
            'Tailwind CSS',
            'Vite & Tooling',
            'UI/UX Responsiva',
            'Jinja2',
          ]
        : [
            'Vue 3 (Composition API)',
            'Pinia (State Store)',
            'TypeScript & JavaScript',
            'Tailwind CSS',
            'Vite & Tooling',
            'Responsive UI/UX',
            'Jinja2',
          ],
  },
  {
    id: 'devops',
    topic: lang === 'it' ? 'Strumenti & Flussi DevOps' : 'Tools & DevOps Workflow',
    categoryIcon: Terminal,
    description:
      lang === 'it'
        ? 'Containerizzazione, pipeline CI/CD automatizzate, framework di test e ambienti riproducibili.'
        : 'Containerization, automated CI/CD pipelines, testing frameworks, and reproducible environments.',
    skills:
      lang === 'it'
        ? [
            'Docker & Compose',
            'GitHub Actions CI/CD',
            'Linux & Shell POSIX',
            'Maven & Gradle',
            'ESLint & Prettier',
            'Deploy Netlify',
            'Flussi Git',
          ]
        : [
            'Docker & Compose',
            'GitHub Actions CI/CD',
            'Linux & POSIX Shell',
            'Maven & Gradle',
            'ESLint & Prettier',
            'Netlify Deployment',
            'Git Workflows',
          ],
  },
]

export const skillCategories = getSkillCategories('en')
