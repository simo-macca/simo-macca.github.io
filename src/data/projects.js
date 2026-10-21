export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal Projects' },
  { id: 'university', label: 'University Projects' },
  { id: 'thesis', label: "Bachelor's Thesis" },
]

export const projects = [
  {
    id: 'pandoras-box',
    title: "Pandora's Box / Frantic Companion",
    category: 'personal',
    role: 'Solo Developer & Architect',
    domain: 'Interactive Web Application',
    contextBadge: 'Personal Project',
    isFlagship: true,
    noSourceCode: false,
    summary:
      'Interactive digital companion and scorekeeper for card games with client-side reactive state tracking.',
    challenge:
      'Tabletop card games Frantic and Pandora’s Box involve intricate scoring rules, escalating penalty points across elimination rounds, and non-trivial card interaction effects requiring continuous rulebook verification.',
    architecture:
      'Engineered an offline-first companion application with client-side reactive state tracking (Pinia), modular card dictionaries with multi-lingual search, zero-latency scorekeeping math, and an automated continuous deployment pipeline targeting Netlify with Vite.',
    tags: ['TypeScript', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Vite', 'Netlify CI/CD'],
    links: {
      github: 'https://github.com/simo-macca/pandoras-box-app',
      demo: 'https://pandoras-box-app.netlify.app/',
      pdf: null,
    },
  },
  {
    id: 'bachelor-thesis',
    title: 'PyTamaro-Web: Pedagogical Analytics & Static Code Analysis',
    category: 'thesis',
    role: "Bachelor's Thesis Researcher",
    domain: 'Static Code Analysis & Analytics',
    contextBadge: "Bachelor's Thesis",
    isFlagship: false,
    noSourceCode: true,
    summary:
      'Automated Python AST static analysis pipeline diagnosing student programming hurdles into interactive instructor dashboards.',
    challenge:
      '"From Raw Data to Pedagogical Insights." University introductory programming environments accumulate vast volumes of student code attempts and runtime errors without structured diagnostic feedback for instructors.',
    architecture:
      'Designed and engineered an automated static analysis pipeline that queries a large database to retrieve and parse student code submissions, extracts common misconception patterns and structural errors, and visualizes aggregate learning progression in an interactive pedagogical dashboard with Tailwind CSS and Jinja2.',
    tags: ['Python', 'Static Analysis', 'Jinja2', 'Tailwind CSS'],
    links: {
      github: null,
      demo: null,
      pdf: '/docs/thesis.pdf',
    },
  },
  {
    id: 'seworld',
    title: 'Software Engineering World (SEWorld)',
    category: 'university',
    role: 'Full-Stack Lead & Group Team',
    domain: 'Full-Stack & AI-Augmented Systems',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Full-stack AI-augmented educational platform providing curriculum tracking, multi-attempt interactive exercises, and contextual LLM tutoring.',
    challenge:
      'Managing student progression, real-time exercise grading, and instructor course authoring while integrating contextual generative AI tutoring and safe LLM evaluation pipelines without compromising academic integrity.',
    architecture:
      'Engineered a layered Spring Boot 3.4 backend (Java 21) with Spring Security OAuth2 (SWITCH Edu-ID Keycloak integration), PostgreSQL 17 via Spring Data JPA, and local LLM orchestration using Spring AI and Ollama (deepseek-llm). Built a reactive Vue 3 UI (Pinia, Bootstrap 5, Chart.js, Markdown editor) containerized via Docker Compose with automated JUnit 5 and Zonky Embedded Postgres testing.',
    tags: [
      'Java 21',
      'Spring Boot 3',
      'Spring AI',
      'Ollama (DeepSeek)',
      'PostgreSQL 17',
      'Vue 3',
      'Docker',
      'OAuth2',
    ],
    links: {
      github: 'https://github.com/simo-macca/SEWorld',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'meme-search-engine',
    title: 'Meme Search Engine',
    category: 'university',
    role: 'Back-End Lead & Duo Team',
    domain: 'Information Retrieval & Clustering',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'End-to-end multimodal Information Retrieval platform with dynamic web scrapers, Apache Solr search cluster, and Carrot2 Lingo topic clustering.',
    challenge:
      'Acquiring unstructured multimodal media across dynamic social platforms, eliminating duplicate memes, and discovering emergent humor themes on-the-fly without pre-labeled taxonomy or training labels.',
    architecture:
      'Engineered an ephemeral ingestion pipeline combining Scrapy and Playwright headless browsers with automated cross-source deduplication and 7-day caching. Provisioned an Apache Solr 9 Cloud cluster integrating the Carrot2 Lingo clustering algorithm for dynamic tag clustering. Built a Vue 3 and Tailwind CSS v4 frontend served through an Nginx reverse proxy to eliminate browser CORS overhead.',
    tags: [
      'Python 3.12',
      'Apache Solr 9',
      'Carrot2 Lingo',
      'Playwright',
      'Scrapy',
      'Vue 3',
      'Tailwind CSS v4',
      'Docker Compose',
      'Nginx',
    ],
    links: {
      github: 'https://github.com/simo-macca/meme-search-engine',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'toc-movers-sat',
    title: 'TOC Movers SAT Solver',
    category: 'university',
    role: 'Front-End Lead & Group Team',
    domain: 'Theory of Computation & SAT Planning',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Optimal multi-agent logistics planning solver reducing movement and item carrying constraints to CNF with Glucose-3 SAT solving.',
    challenge:
      'Multi-agent movement and item logistics across building floors is an NP-complete combinatorial planning problem where naive state space search suffers exponential combinatorial explosion.',
    architecture:
      'Formulated a formal polynomial-time reduction encoding movement and downwards-only carrying logistics across 13 constraint groups (A–M) into Propositional CNF using PySAT IDPool. Engineered an iterative deepening solver with Glucose-3 guaranteeing minimal time horizon T*, isolated in child worker processes with 118s timeouts. Developed a FastAPI REST backend and a Vue 3 animated building visualizer with DIMACS CNF export.',
    tags: [
      'Python',
      'FastAPI',
      'PySAT (Glucose-3)',
      'Propositional CNF',
      'Vue 3',
      'Tailwind CSS v4',
      'Docker',
    ],
    links: {
      github: 'https://github.com/simo-macca/toc-movers-sat',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'battleship',
    title: 'Battleship Engine & Graphical AI',
    category: 'university',
    role: 'Software Engineer & Duo Team',
    domain: 'Object-Oriented Architecture & Game AI',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Modular desktop Battleship game engine built with strict Model-View separation, classic design patterns, and an intelligent hunt-and-target AI.',
    challenge:
      'Decoupling game state transitions, projectile interactions, drag-and-drop fleet positioning, and intelligent opponent heuristics from GUI rendering while maintaining immutability.',
    architecture:
      'Built on Java 17 with strict Model-View separation powered by the JTamaro functional GUI library. Implemented the State Pattern for phase transitions (placement, weapon selection, targeting, post-attack handover), Strategy Pattern for AI opponents (Random vs. LogicComputer hunt-and-target search), and Visitor Pattern for projectile rendering. Enforced quality via JUnit suites, JaCoCo, PMD 7, and CPD.',
    tags: [
      'Java 17',
      'State Pattern',
      'Strategy Pattern',
      'Visitor Pattern',
      'JTamaro GUI',
      'JUnit',
      'PMD & JaCoCo',
      'Gradle',
    ],
    links: {
      github: 'https://github.com/simo-macca/battleship',
      demo: null,
      pdf: null,
    },
  },
  {
    id: 'snake-racket',
    title: 'Snake in Functional Racket',
    category: 'university',
    role: 'Software Engineer & Duo Team',
    domain: 'Functional Programming Paradigms',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Pure functional arcade Snake game developed in Racket (ASL) using immutable recursive world states and the 2htdp/universe reactive engine.',
    challenge:
      'Implementing real-time collision physics, dynamic difficulty scaling, sprite rotation, and growing entity state entirely without mutable variables or side effects.',
    architecture:
      'Developed in Racket following the How to Design Programs (HtDP) design recipe. Modeled game states as immutable structs evaluated through 2htdp/universe big-bang event loops. Implemented dynamic speed scaling via clock dividers, recursive self-collision detection, 180° reverse-turn locks, available-position apple placement, and custom digit sprite score rendering, fully verified by 140 check-expect unit tests.',
    tags: [
      'Racket (ASL)',
      'Functional Programming',
      '2htdp/universe',
      'HtDP Design Recipe',
      'Unit Testing',
    ],
    links: {
      github: 'https://github.com/simo-macca/snake-racket',
      demo: null,
      pdf: null,
    },
  },
]
