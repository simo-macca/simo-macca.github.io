<script setup>
import TechCardComponent from '@/components/TechCardComponent.vue'
import { Database, Cpu, Code2, Terminal } from '@lucide/vue'

const skillCategories = [
  {
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
</script>

<template>
  <section class="py-20" aria-label="Skills and technical capabilities section">
    <div class="mx-auto max-w-6xl">
      <div class="mb-14 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          Technical Skills &amp; Capabilities
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          Structured expertise across data management systems, machine intelligence, and engineering
          architecture.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TechCardComponent
          v-for="(cat, index) in skillCategories"
          :key="cat.topic"
          :topic="cat.topic"
          :description="cat.description"
          :skills="cat.skills"
          :categoryIcon="cat.categoryIcon"
          v-motion-slide-up
          :delay="index * 100"
        />
      </div>
    </div>
  </section>
</template>
