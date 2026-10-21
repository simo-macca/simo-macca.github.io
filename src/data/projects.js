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
    role: "Bachelor's Thesis Researcher & Software Engineer",
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
    role: 'Group Team & Full-Stack Lead',
    domain: 'Educational Platform & Microservices',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Full-stack education and exercise platform with automated validation and role-based access control.',
    challenge:
      'Managing student exercises, grading workflows, and real-time statistics requires robust role-based security, modular backend architecture, and seamless collaborative workflows.',
    architecture:
      'Built a layered Spring Boot application adhering to Domain-Driven Design (DDD) with JWT security, PostgreSQL persistence, and comprehensive unit/integration test suites. Coupled with a responsive Vue.js UI and automated Docker/GitLab CI pipelines under agile Scrum practices.',
    tags: ['Java', 'Spring Boot', 'Vue.js', 'PostgreSQL', 'Docker', 'REST API'],
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
    role: 'Duo Team & Back-end Lead',
    domain: 'Information Retrieval',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Multi-modal search engine pipeline utilizing Solr cluster and Scrapy crawlers for rapid visual and textual meme discovery.',
    challenge:
      'Querying unstructured multimodal meme corpora requires extracting both image text and conceptual humor themes while handling noisy metadata, synonymy, typos, and high latency.',
    architecture:
      'Designed distributed web scraping spiders with Scrapy, configured an Apache Solr search cluster and built a reactive Vue.js front-end achieving sub-second multi-field queries and faceted filtering.',
    tags: ['Python', 'Apache Solr', 'Scrapy', 'Vue.js', 'REST APIs', 'Docker'],
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
    role: 'Group Team & Front-end Lead',
    domain: 'Theory of Computation & SAT',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Polynomial reduction of Concurrent grid movement problems to CNF with automated SAT solving and step visualizer.',
    challenge:
      'Concurrent grid motion planning with obstacle relocation is an NP-complete combinatorial problem where naive graph search experiences combinatorial explosion over large state spaces.',
    architecture:
      'Formulated a formal polynomial-time reduction encoding grid topology, obstacle collision constraints, and temporal steps into Conjunctive Normal Form (CNF). Built automated DIMACS CNF generators and integrated SAT solvers (Minisat), complemented by a Vue.js step-by-step state visualizer.',
    tags: ['Python', 'SAT Solvers (Minisat)', 'CNF Encoding', 'Vue.js', 'Algorithms'],
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
    role: 'Duo team',
    domain: 'Object-Oriented Architecture',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Robust Java implementation of Battleship leveraging design patterns and multi-tier AI opponents.',
    challenge:
      'Coordinating complex turn-based gameplay, deterministic rule checking, multi-tiered AI opponents, and GUI rendering without tight state coupling.',
    architecture:
      'Architected a clean Java application leveraging the State Pattern for game turn lifecycles and the Visitor Pattern for board cell evaluations. Developed heuristic AI opponents (Hunt-and-Target & probability density) backed by an extensive JUnit test suite.',
    tags: ['Java 17', 'State Pattern', 'Visitor Pattern', 'JUnit 5', 'Gradle', 'GUI'],
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
    role: 'Duo team',
    domain: 'Functional Programming Paradigms',
    contextBadge: 'University Project',
    isFlagship: false,
    noSourceCode: false,
    summary:
      'Pure functional implementation of the classic Snake game using immutable recursive data structures.',
    challenge:
      'Implementing an interactive game with real-time collision detection and growing state without using mutable variables or global state side effects.',
    architecture:
      'Engineered entirely in Racket using pure functional programming. State is maintained as an immutable recursive data structure with purely functional state transitions triggered by world clock ticks and key events via 2htdp/universe canvas rendering.',
    tags: ['Racket (Lisp)', 'Functional Programming', '2htdp/universe', 'Recursion'],
    links: {
      github: 'https://github.com/simo-macca/snake-racket',
      demo: null,
      pdf: null,
    },
  },
]
