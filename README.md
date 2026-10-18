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

## Featured Engineering Case Studies

1. **Pandora's Box / Frantic Companion App** _(Solo Developer & Architect)_
   - Interactive companion app and digital scorekeeper for card games with client-side reactive state tracking, card dictionaries, and automated CI/CD on Netlify.
   - [Repository](https://github.com/simo-macca/pandoras-box-app) &middot; [Live Demo](https://pandoras-box-app.netlify.app/)
2. **Meme Search Engine** _(Academic Team Member & Full-Stack Lead)_
   - Multi-modal information retrieval system featuring Scrapy spiders, Apache Solr indexing cluster, BM25 scoring, and sub-second faceted query retrieval in Vue.js.
   - [Repository](https://github.com/simo-macca/meme-search-engine)
3. **TOC Movers SAT Solver** _(Academic Team Member)_
   - Polynomial-time reduction of multi-agent grid motion planning to Conjunctive Normal Form (CNF) with automated DIMACS generation and Minisat solving.
   - [Repository](https://github.com/simo-macca/toc-movers-sat)
4. **Software Engineering World (SEWorld)** _(Full-Stack Lead & Scrum Collaborator)_
   - Microservices-backed educational management platform built with Spring Boot, PostgreSQL, role-based access control (RBAC), and Vue.js.
   - [Repository](https://github.com/simo-macca/SEWorld)
5. **Battleship Engine & Graphical AI** _(Lead Architect)_
   - Object-oriented Java game engine utilizing the State Pattern for lifecycle control, Visitor Pattern for board traversal, and multi-tier heuristic AI opponents.
   - [Repository](https://github.com/simo-macca/battleship)
6. **Snake in Functional Racket** _(Solo / Academic Collaborator)_
   - Classic game engineered entirely in Racket without mutable state, modeled as recursive immutable world states over 2htdp/universe.
   - [Repository](https://github.com/simo-macca/snake-racket)
7. **PyTamaro-Web: Pedagogical Analytics & Static Code Analysis** _(Bachelor's Thesis Showcase)_
   - _"From Raw Data to Pedagogical Insights."_ Static Python AST parsing pipeline extracting aggregate misconception patterns into an interactive pedagogical dashboard.
   - _Confidential University Project (USI Lugano)_

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
│   │   ├── ContactCardComponent.vue   # Individual contact method card
│   │   ├── ContactFormComponent.vue   # Accessible validated contact form (Web3Forms + hCaptcha)
│   │   ├── DarkModeComponent.vue      # Theme toggle button with Lucide icons
│   │   ├── FooterComponent.vue        # Semantic footer with dynamic copyright & social links
│   │   ├── GitHubComponent.vue        # Accessible GitHub link
│   │   ├── LinkedinComponent.vue      # Accessible LinkedIn link
│   │   ├── NavbarComponent.vue        # Responsive header with mobile drawer navigation
│   │   ├── ProjectCard.vue            # Structured engineering case study cards
│   │   ├── SendButtonComponent.vue    # Async state-driven submission button
│   │   └── TechCardComponent.vue      # Domain capability cards with mono badges
│   ├── stores/
│   │   └── ThemeStore.js      # Pinia store syncing system theme, localStorage & cross-tab state
│   ├── views/
│   │   ├── AboutView.vue      # Technical background & academic trajectory (ETH Zurich & USI)
│   │   ├── ContactView.vue    # Contact section with structured grid layout
│   │   ├── HomeView.vue       # Hero section positioned around systems & machine intelligence
│   │   ├── ProjectsView.vue   # Categorized engineering case study matrix with filtering
│   │   └── SkillsView.vue     # 4-quadrant technical capabilities matrix
│   ├── App.vue                # Root application layout with ambient glow backdrop
│   └── main.js                # Vue initialization, Pinia, MotionPlugin, and theme bootstrap
├── index.html                 # HTML entry with FOUC prevention script & Open Graph tags
├── vite.config.js             # Vite configuration with Tailwind v4 and path aliases
└── package.json               # Dependencies and scripts
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

# Format code with Prettier
npm run format
```

### Production Build

```bash
npm run build
```

Generates optimized, minified distribution assets in `dist/`.

---

## Continuous Integration & Deployment

- **CI (`.github/workflows/ci.yml`):** Automatically triggered on pushes and pull requests targeting `main`, executing full code formatting verification, linting, and Vite production builds.
- **CD (`.github/workflows/deploy.yml`):** Deploys static build artifacts to GitHub Pages upon pushing to `main`.
