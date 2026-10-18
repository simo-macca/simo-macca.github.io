import { Database, Cpu, Code2, Terminal } from '@lucide/vue'

export const skillCategories = [
  {
    id: 'systems',
    topic: 'Systems & Data Platforms',
    categoryIcon: Database,
    description:
      'Data engine internals, query optimization, distributed storage, and transactional backend services.',
    skills: [
      'PostgreSQL',
      'Apache Solr',
      'Query Optimization',
      'Distributed Systems',
      'Spring Boot',
      'Java (Modern)',
      'C / C++',
      'Database Internals',
      'Redis',
      'RESTful APIs',
    ],
  },
  {
    id: 'intelligence',
    topic: 'Machine Intelligence & Applied Math',
    categoryIcon: Cpu,
    description:
      'Information retrieval, SAT solver formal reductions, NLP embeddings, and algorithmic modeling.',
    skills: [
      'Multi-Modal IR',
      'SAT Solvers (Minisat)',
      'NLP Feature Extraction',
      'Python',
      'Pandas & NumPy',
      'Scikit-Learn',
      'Formal Reductions',
      'Complexity Analysis',
      'Scrapy',
    ],
  },
  {
    id: 'frontend',
    topic: 'Full-Stack Web Engineering',
    categoryIcon: Code2,
    description:
      'Modern reactive component architectures, accessible user interfaces, and state synchronization.',
    skills: [
      'Vue 3 (Composition API)',
      'Pinia (State Store)',
      'TypeScript & JavaScript',
      'Tailwind CSS',
      'Vite & Tooling',
      'Semantic HTML & A11y',
      'Responsive UI/UX',
      'Jinja2',
    ],
  },
  {
    id: 'devops',
    topic: 'Tools & DevOps Workflow',
    categoryIcon: Terminal,
    description:
      'Containerization, automated CI/CD pipelines, testing frameworks, and reproducible environments.',
    skills: [
      'Docker & Compose',
      'GitHub Actions CI/CD',
      'Linux & POSIX Shell',
      'Maven & Gradle',
      'Vitest & JUnit',
      'ESLint & Prettier',
      'Netlify Deployment',
      'Git Workflows',
    ],
  },
]
