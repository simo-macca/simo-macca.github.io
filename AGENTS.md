# Repository Guidelines & Agent Protocols

Welcome to the **Simone Maccario Engineering Portfolio** codebase (`simo-macca.github.io`). This repository powers the personal portfolio website showcasing systems engineering, algorithmic planning, distributed search, and machine intelligence projects.

---

## 1. Architecture & Technology Stack

The application is engineered as a zero-runtime-overhead Single Page Application (SPA) with no server-side rendering:

- **Core Framework:** [Vue.js 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **State Management:** [Pinia](https://pinia.vuejs.org/) (`src/stores/ThemeStore.js` for reactive dark/light mode with `localStorage` and cross-tab `storage` event syncing)
- **Build System:** [Vite](https://vite.dev/) with `@tailwindcss/vite` and `@vitejs/plugin-vue`
- **Styling & Design Tokens:** [Tailwind CSS v4](https://tailwindcss.com/) (`@import 'tailwindcss';` in `src/assets/main.css`, custom OKLCH palette, CSS theme variables, and `interpolate-size: allow-keywords`)
- **Icons & Animation:**
  - Generic UI icons: [`@lucide/vue`](https://lucide.dev/)
  - Brand/Custom SVG icons: `src/components/icons/` (`GitHubIcon.vue`, `LinkedinIcon.vue`, `IconLogoPortfolio.vue`)
  - Entrance transitions: [`@vueuse/motion`](https://motion.vueuse.org/) and [`@vueuse/core`](https://vueuse.org/)
- **Code Quality & Tooling:** Oxlint, ESLint 10 (Flat Config), Prettier with Tailwind and OXC plugins, Husky, and Lint-Staged
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

---

## 2. Testing Policy (CRITICAL)

> [!IMPORTANT]
> **There is NO automated testing suite (Vitest, Jest, Cypress, or Testing Library) in this repository.**
>
> - **DO NOT** attempt to run `npm test` or install test runners unless explicitly instructed by the user.
> - Verification and quality assurance are strictly performed using linting, formatting checks, and production builds:
>   - `npm run lint` (runs `oxlint` and `eslint`)
>   - `npm run format:check` (validates Prettier code style)
>   - `npm run build` (verifies Vite asset bundling and module transformation)

---

## 3. Agent Operating Protocols

### A. Plan-First Protocol

1. **Analyze First:** Before modifying or refactoring code, thoroughly inspect existing components, styles, and data structures.
2. **Formulate Strategy:** For non-trivial modifications, outline the technical approach, affected files, edge cases, and accessibility considerations before executing changes.
3. **Preserve Integrity:** Maintain existing docstrings, comments, styling conventions, and domain badge semantics.

### B. Git Branching & Staging Protocol

1. **Dedicated Branches:** Do not perform direct work or commits on `main`. Always create and switch to a targeted local branch (e.g. `feat/...` or `fix/...`).
2. **Pre-Commit Staging:** A pre-commit hook runs `lint-staged` (`oxlint --fix`, `eslint --fix`, and `prettier --write`).
3. **Unstaged Working Tree Rules:** If the user specifies that changes must remain unstaged or asks for a `git diff` review, **STRICTLY FORBIDDEN** from running `git add`, `git commit`, or `git push` until explicit user confirmation is given.
4. **Rebase & Cleanup:** When changes are approved and rebased into `main`, clean up feature branches locally and remotely.

---

## 4. Directory Structure Reference

```text
simo-macca.github.io/
├── .agents/
│   └── rules/                 # Targeted path-specific agent rules
│       ├── components.md      # Vue 3 SFC & Tailwind guidelines
│       └── state-logic.md     # Pinia store & data structure conventions
├── .github/workflows/         # CI verification & GitHub Pages deployment
├── .husky/                    # Pre-commit git hooks
├── public/                    # Static assets, Open Graph preview, thesis PDF
├── src/
│   ├── assets/                # main.css (Tailwind v4 directives & design tokens)
│   ├── components/            # Vue components (contact, layout, projects, icons)
│   ├── data/                  # Static data models (projects.js, skills.js, socials.js)
│   ├── stores/                # Pinia reactive stores (ThemeStore.js)
│   ├── views/                 # Top-level view sections (Home, About, Skills, Projects, Contact)
│   ├── App.vue                # Root layout component
│   └── main.js                # App bootstrap, Pinia, and VueUse Motion setup
├── AGENTS.md                  # Root agent instructions and workspace protocols
├── index.html                 # HTML shell with anti-FOUC theme script
├── package.json               # Node dependencies and project scripts
└── vite.config.js             # Vite build configuration and path aliases
```

---

## 5. Standard Verification Commands

```bash
# Run linters (Oxlint + ESLint)
npm run lint

# Check code formatting (Prettier)
npm run format:check

# Format and auto-fix all files
npm run format

# Verify production build compilation
npm run build
```
