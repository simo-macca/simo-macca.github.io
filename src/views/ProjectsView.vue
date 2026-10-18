<script setup>
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

const activeFilter = ref('all')

const filterOptions = [
  { id: 'all', label: 'All Projects' },
  { id: 'flagship', label: 'Flagship & Web' },
  { id: 'systems', label: 'Systems & Theory' },
  { id: 'research', label: 'Academic & Research' },
]

const projects = [
  {
    id: 'pandoras-box',
    title: "Pandora's Box / Frantic Companion",
    role: 'Solo Developer & Architect',
    domain: 'Interactive Web Application',
    contextBadge: 'Solo Project',
    category: 'flagship',
    isFlagship: true,
    problem:
      'Tabletop card games Frantic and Pandora’s Box involve intricate scoring rules, escalating penalty points across elimination rounds, and non-trivial card interaction effects requiring continuous rulebook verification.',
    architecture:
      'Engineered an offline-first companion application with client-side reactive state tracking (Pinia), modular card dictionaries with multi-lingual search, zero-latency scorekeeping math, and an automated continuous deployment pipeline targeting Netlify with Vite.',
    techStack: ['TypeScript', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Vite', 'Netlify CI/CD'],
    githubUrl: 'https://github.com/simo-macca/pandoras-box-app',
    liveUrl: 'https://pandoras-box-app.netlify.app/',
    isConfidential: false,
  },
  {
    id: 'meme-search-engine',
    title: 'Meme Search Engine',
    role: 'Academic Team Member & Full-Stack Lead',
    domain: 'Information Retrieval & NLP',
    contextBadge: 'University Team Project',
    category: 'systems',
    isFlagship: false,
    problem:
      'Querying unstructured multimodal meme corpora requires extracting both image text and conceptual humor themes while handling noisy metadata, synonymy, typos, and high latency.',
    architecture:
      'Designed distributed web scraping spiders with Scrapy, configured an Apache Solr search cluster with custom token analysis, n-grams, and BM25 relevance tuning, and built a reactive Vue.js front-end achieving sub-second multi-field queries and faceted filtering.',
    techStack: ['Python', 'Apache Solr', 'Scrapy', 'Vue.js', 'REST APIs', 'Docker'],
    githubUrl: 'https://github.com/simo-macca/meme-search-engine',
    liveUrl: null,
    isConfidential: false,
  },
  {
    id: 'toc-movers-sat',
    title: 'TOC Movers SAT Solver',
    role: 'Academic Team Member',
    domain: 'Theory of Computation & SAT',
    contextBadge: 'University Team Project',
    category: 'systems',
    isFlagship: false,
    problem:
      'Multi-agent grid motion planning with obstacle relocation is an NP-complete combinatorial problem where naive graph search experiences combinatorial explosion over large state spaces.',
    architecture:
      'Formulated a formal polynomial-time reduction encoding grid topology, obstacle collision constraints, and temporal steps into Conjunctive Normal Form (CNF). Built automated DIMACS CNF generators and integrated SAT solvers (Minisat), complemented by a Vue.js step-by-step state visualizer.',
    techStack: ['Python', 'SAT Solvers (Minisat)', 'CNF Encoding', 'Vue.js', 'Algorithms'],
    githubUrl: 'https://github.com/simo-macca/toc-movers-sat',
    liveUrl: null,
    isConfidential: false,
  },
  {
    id: 'bachelor-thesis',
    title: 'PyTamaro-Web: Pedagogical Analytics & Static Code Analysis',
    role: "Bachelor's Thesis Researcher & Engineer",
    domain: 'Static Code Analysis & Analytics',
    contextBadge: 'Confidential / University Project',
    category: 'research',
    isFlagship: false,
    problem:
      '"From Raw Data to Pedagogical Insights." University introductory programming environments accumulate vast volumes of student code attempts and runtime errors without structured diagnostic feedback for instructors.',
    architecture:
      "Designed and engineered an automated static analysis pipeline that parses students' Python abstract syntax trees (ASTs), extracts common misconception patterns and structural errors, and visualizes aggregate learning progression in an interactive pedagogical dashboard with Tailwind CSS and Jinja2.",
    techStack: [
      'Python',
      'Abstract Syntax Trees (AST)',
      'Static Analysis',
      'Jinja2',
      'Tailwind CSS',
    ],
    githubUrl: null,
    liveUrl: null,
    isConfidential: true,
  },
  {
    id: 'seworld',
    title: 'Software Engineering World (SEWorld)',
    role: 'Full-Stack Lead & Scrum Collaborator',
    domain: 'Educational Platform & Microservices',
    contextBadge: 'Academic Team Collaboration',
    category: 'flagship',
    isFlagship: false,
    problem:
      'Managing student exercises, grading workflows, and real-time statistics requires robust role-based security, modular backend architecture, and seamless collaborative workflows.',
    architecture:
      'Built a layered Spring Boot application adhering to Domain-Driven Design (DDD) with JWT security, PostgreSQL persistence, and comprehensive unit/integration test suites. Coupled with a responsive Vue.js UI and automated Docker/GitLab CI pipelines under agile Scrum practices.',
    techStack: ['Java', 'Spring Boot', 'Vue.js', 'PostgreSQL', 'Docker', 'REST API'],
    githubUrl: 'https://github.com/simo-macca/SEWorld',
    liveUrl: null,
    isConfidential: false,
  },
  {
    id: 'battleship',
    title: 'Battleship Engine & Graphical AI',
    role: 'Academic Team Member & Lead Architect',
    domain: 'Object-Oriented Architecture',
    contextBadge: 'Academic Team Project',
    category: 'systems',
    isFlagship: false,
    problem:
      'Coordinating complex turn-based gameplay, deterministic rule checking, multi-tiered AI opponents, and GUI rendering without tight state coupling.',
    architecture:
      'Architected a clean Java application leveraging the State Pattern for game turn lifecycles and the Visitor Pattern for board cell evaluations. Developed heuristic AI opponents (Hunt-and-Target & probability density) backed by an extensive JUnit test suite.',
    techStack: ['Java 17', 'State Pattern', 'Visitor Pattern', 'JUnit 5', 'Gradle', 'GUI'],
    githubUrl: 'https://github.com/simo-macca/battleship',
    liveUrl: null,
    isConfidential: false,
  },
  {
    id: 'snake-racket',
    title: 'Snake in Functional Racket',
    role: 'Solo / Academic Collaborator',
    domain: 'Functional Programming Paradigms',
    contextBadge: 'Academic Showcase',
    category: 'research',
    isFlagship: false,
    problem:
      'Implementing an interactive game with real-time collision detection and growing state without using mutable variables or global state side effects.',
    architecture:
      'Engineered entirely in Racket using pure functional programming. State is maintained as an immutable recursive data structure with purely functional state transitions triggered by world clock ticks and key events via 2htdp/universe canvas rendering.',
    techStack: ['Racket (Lisp)', 'Functional Programming', '2htdp/universe', 'Recursion'],
    githubUrl: 'https://github.com/simo-macca/snake-racket',
    liveUrl: null,
    isConfidential: false,
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => p.category === activeFilter.value)
})
</script>

<template>
  <section class="py-20" aria-label="Projects and Engineering Case Studies">
    <div class="mx-auto max-w-7xl">
      <!-- Section Title & Narrative -->
      <div class="mb-10 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          Engineering Case Studies
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          A curated portfolio of systems architectures, algorithmic solvers, information retrieval
          engines, and reactive web applications.
        </p>

        <!-- Category Filter Tabs -->
        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <button
            v-for="opt in filterOptions"
            :key="opt.id"
            type="button"
            @click="activeFilter = opt.id"
            class="rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
            :class="[
              activeFilter === opt.id
                ? 'bg-sky-600 text-white shadow-xs dark:bg-sky-500'
                : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-white/[0.08] dark:bg-[#111827]/80 dark:text-[#9CA3AF] dark:hover:border-white/[0.16] dark:hover:bg-[#1F2937] dark:hover:text-[#F3F4F6]',
            ]"
            :aria-pressed="activeFilter === opt.id"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          v-bind="project"
          v-motion-slide-up
          :delay="(index % 3) * 100"
        />
      </div>
    </div>
  </section>
</template>
