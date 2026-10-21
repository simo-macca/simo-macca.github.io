# Simone Maccario &mdash; Systems Engineering & Machine Intelligence Portfolio

Welcome to the repository for my personal engineering portfolio website: [simo-macca.github.io](https://simo-macca.github.io).

This portfolio highlights my academic trajectory at **ETH Zurich** (MSc in Computer Science specializing in Data Management and Machine Intelligence), theoretical computer science reductions, distributed search architectures, and production-grade full-stack systems.

**Live Website:** [https://simo-macca.github.io](https://simo-macca.github.io)

---

## Technical Stack & Architecture

The application is engineered as a high-performance single-page application (SPA) with zero runtime dependencies on server-side rendering:

- **Frontend Core:** [Vue.js 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **State Management:** [Pinia](https://pinia.vuejs.org/) for reactive theme preference synchronization (`prefers-color-scheme` + persistent `localStorage` with cross-tab syncing and FOUC prevention)
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens, dark/light theme variables, and WCAG AA/AAA compliant graphite and slate palettes
- **Typography:** Inter & JetBrains Mono with optimized asset preconnection
- **Icons & Motion:** [`@lucide/vue`](https://lucide.dev/), [`@vueuse/core`](https://vueuse.org/), and [`@vueuse/motion`](https://motion.vueuse.org/) for spring-based entrance transitions
- **Build Tooling:** [Vite](https://vitejs.dev/) with tree-shaking and minification
- **Quality Assurance:** Oxlint, ESLint 9 (Flat Config), Prettier, Husky pre-commit hooks, and Lint-Staged
- **CI/CD Automation:** GitHub Actions for automated lint/build validation and zero-downtime GitHub Pages deployment

---

## Project Taxonomy & Case Studies

### 1. Personal Projects

- **Pandora's Box / Frantic Companion App** _(Solo Developer & Architect)_
  - Interactive companion app and digital scorekeeper for card games with client-side reactive state tracking, card dictionaries, and automated CI/CD on Netlify.
  - [Repository](https://github.com/simo-macca/pandoras-box-app) &middot; [Live Demo](https://pandoras-box-app.netlify.app/)

### 2. University Projects

- **Meme Search Engine** _(Duo Team & Back-end Lead)_
  - Multi-modal information retrieval system featuring Scrapy spiders, Apache Solr indexing cluster, BM25 scoring, and sub-second faceted query retrieval in Vue.js.
  - [Repository](https://github.com/simo-macca/meme-search-engine)
- **TOC Movers SAT Solver** _(Front-end Lead & Group Team)_
  - Polynomial-time reduction of multi-agent grid motion planning to Conjunctive Normal Form (CNF) with automated DIMACS generation and Minisat solving.
  - [Repository](https://github.com/simo-macca/toc-movers-sat)
- **Software Engineering World (SEWorld)** _(Full-Stack Lead & Group Team)_
  - Microservices-backed educational management platform built with Spring Boot, PostgreSQL, role-based access control (RBAC), and Vue.js.
  - [Repository](https://github.com/simo-macca/SEWorld)
- **Battleship Engine & Graphical AI** _(Duo team)_
  - Object-oriented Java game engine utilizing the State Pattern for lifecycle control, Visitor Pattern for board traversal, and multi-tier heuristic AI opponents.
  - [Repository](https://github.com/simo-macca/battleship)
- **Snake in Functional Racket** _(Duo team)_
  - Classic game engineered entirely in Racket without mutable state, modeled as recursive immutable world states over 2htdp/universe.
  - [Repository](https://github.com/simo-macca/snake-racket)

### 3. Bachelor's Thesis

- **PyTamaro-Web: Pedagogical Analytics & Static Code Analysis** _(Bachelor's Thesis Researcher & Software Engineer)_
  - _"From Raw Data to Pedagogical Insights."_ Static Python AST parsing pipeline extracting aggregate misconception patterns into an interactive pedagogical dashboard.
  - [Read Thesis (PDF)](public/docs/thesis.pdf) &middot; _No Source Code (Institutional Project)_

---

## Project Structure

```
.
├── .github/workflows/         # Automated CI verification & GitHub Pages deployment workflows
├── .husky/                    # Git hooks (pre-commit lint-staged)
├── public/                    # Static assets, favicon, Open Graph preview image
├── src/
│   ├── assets/
│   │   └── main.css           # Tailwind CSS v4 directives, design system variables, dark mode
│   ├── components/
│   │   ├── contact/
│   │   │   ├── FormAlert.vue          # Accessible form notification and alert states
│   │   │   └── FormField.vue          # Modular form field with accessible labels and error handling
│   │   ├── icons/
│   │   │   ├── GitHubIcon.vue         # Standalone SVG GitHub icon
│   │   │   └── LinkedinIcon.vue       # Standalone SVG LinkedIn icon
│   │   ├── layout/
│   │   │   └── MobileNavDrawer.vue    # Decomposed mobile navigation drawer with accessible transitions
│   │   ├── projects/
│   │   │   ├── ProjectBadge.vue       # Monospace tag chips with standard padding and color variants
│   │   │   ├── ProjectCard.vue        # Structured engineering case study cards with bottom-aligned actions
│   │   │   ├── ProjectFilterTabs.vue  # Accessible category tab switcher
│   │   │   └── ProjectGrid.vue        # Responsive grid managing list rendering and empty states
│   │   ├── ContactCardComponent.vue   # Individual contact method card
│   │   ├── ContactFormComponent.vue   # Orchestrator contact form (Web3Forms + hCaptcha)
│   │   ├── DarkModeComponent.vue      # Theme toggle button with Lucide icons
│   │   ├── FooterComponent.vue        # Semantic footer with dynamic copyright & social links
│   │   ├── GitHubComponent.vue        # Accessible GitHub link
│   │   ├── LinkedinComponent.vue      # Accessible LinkedIn link
│   │   ├── NavbarComponent.vue        # Responsive header orchestrator
│   │   ├── SendButtonComponent.vue    # Async state-driven submission button
│   │   └── TechCardComponent.vue      # Domain capability cards with mono badges
│   ├── data/
│   │   ├── projects.js        # Decoupled project case studies, categories, and links
│   │   ├── skills.js          # Technical capabilities, quadrant categories, and icons
│   │   └── socials.js         # Navigation links and contact methods
│   ├── stores/
│   │   └── ThemeStore.js      # Pinia store syncing system theme, localStorage & cross-tab state
│   ├── views/
│   │   ├── AboutView.vue      # Technical background & academic trajectory (ETH Zurich & USI)
│   │   ├── ContactView.vue    # Contact section with structured grid layout
│   │   ├── HomeView.vue       # Hero section positioned around systems & machine intelligence
│   │   ├── ProjectsView.vue   # Orchestrating case study view with active filter state
│   │   └── SkillsView.vue     # 4-quadrant technical capabilities matrix
│   ├── App.vue                # Root application layout with ambient glow backdrop
│   └── main.js                # Vue initialization, Pinia, MotionPlugin, and theme bootstrap
├── index.html                 # HTML entry with FOUC prevention script & Open Graph tags
├── vite.config.js             # Vite configuration with Tailwind v4 and path aliases
└── package.json               # Dependencies, allowScripts, and scripts
```

---

## Local Development Setup

### Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm `10+`

### Installation

```bash
git clone https://github.com/simo-macca/simo-macca.github.io.git
cd simo-macca.github.io
npm install
```

### Development Server

```bash
npm run dev
```

Launches the local Vite server at `http://localhost:3000`.

### Code Quality & Formatting

```bash
# Run oxlint and eslint
npm run lint

# Check formatting across all files
npm run format:check

# Format code with Prettier and auto-fix linting across all files
npm run format
```

A Git pre-commit hook configured via Husky and Lint-Staged automatically lints and formats staged files before every commit, auto-staging formatted changes and blocking any commits that fail checks.

### Production Build

```bash
npm run build
```

Generates optimized, minified distribution assets in `dist/`.

---

## Continuous Integration & Deployment

- **CI (`.github/workflows/ci.yml`):** Automatically triggered on pushes and pull requests targeting `main`, executing full code formatting verification, linting, and Vite production builds.
- **CD (`.github/workflows/deploy.yml`):** Deploys static build artifacts to GitHub Pages upon pushing to `main`.
