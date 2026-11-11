# Simone Maccario: Portfolio

[![CI & Deploy](https://github.com/simo-macca/simo-macca.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/simo-macca/simo-macca.github.io/actions/workflows/deploy.yml)
![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)

Source of my personal portfolio: **[simo-macca.github.io](https://simo-macca.github.io)**.

I am an MSc Computer Science student at **ETH Zurich** (Data Management & Machine Intelligence) with a BSc in Informatics from **USI** (magna cum laude). The site presents my background, skills, projects and my Bachelor's thesis, in **English and Italian**, with light and dark themes.

---

## Features

- **Bilingual UI (EN / IT)**: detected from the browser on the first visit, then remembered; `<html lang>`, page title and meta description follow the active language.
- **Light / dark theme**: follows the operating system until you choose, persists the choice, syncs across tabs and is applied before first paint (no flash).
- **Projects & research**: compact cards with a category filter (with counts); each card's **Details** button opens an accessible dialog (bottom sheet on phones) with the challenge, the approach, key results, the full stack and links.
- **Journey timeline**: education and work experience in the About section.
- **Contact form**: [Web3Forms](https://web3forms.com/) with optional [hCaptcha](https://www.hcaptcha.com/), a honeypot field, localised validation and clear success/error states.
- **Motion & polish**: spring entrance animations, animated logo and gradient text, cursor spotlight on cards, scroll-spy navigation, reading-progress bar and a back-to-top button. Everything respects `prefers-reduced-motion`.
- **Accessibility**: skip link, semantic landmarks, labelled icon buttons, visible focus rings, `aria-current` / `aria-pressed` / `aria-expanded` states, 40 px+ touch targets and an iOS-safe (no auto-zoom) form.
- **SEO**: canonical URL, Open Graph / Twitter cards, JSON-LD `Person` data, `robots.txt` and `sitemap.xml`.

---

## Projects featured on the site

| Project                                                                               | Context                     | Stack (main)                                     |
| :------------------------------------------------------------------------------------ | :-------------------------- | :----------------------------------------------- |
| [Frantic: Pandora's Box Companion](https://github.com/simo-macca/pandoras-box-app)    | Personal · solo             | React 18, TypeScript, Vite, PWA, Vitest, Netlify |
| From Raw Data to Pedagogical Insights ([thesis PDF](public/docs/thesis.pdf))          | Bachelor's thesis, USI      | Python, PostgreSQL, ty, Jinja2, Monaco Editor    |
| [OptiMove: SAT-Based Logistics Planner](https://github.com/simo-macca/toc-movers-sat) | University · front-end lead | Python, PySAT (Glucose-3), FastAPI, Vue 3        |
| [WDYMEME: Meme Search Engine](https://github.com/simo-macca/meme-search-engine)       | University · back-end lead  | Playwright, Scrapy, Solr 9, Carrot2, Vue 3       |
| [SEWorld](https://github.com/simo-macca/SEWorld)                                      | University · team of ~20    | Spring Boot 3, Spring AI, Ollama, Vue 3          |
| [Battleship in Java](https://github.com/simo-macca/battleship)                        | University · team of 2      | Java 17, JTamaro, JUnit, PMD                     |
| [Snake in Racket](https://github.com/simo-macca/snake-racket)                         | University · team of 2      | Racket, 2htdp/universe                           |

The thesis source code is part of an institutional project and is **not public**; only the thesis PDF is published. All project content lives in [`src/data/projects.js`](src/data/projects.js).

---

## Tech stack

| Area      | Choice                                                                                            |
| :-------- | :------------------------------------------------------------------------------------------------ |
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`), single-page, no router           |
| State     | [Pinia](https://pinia.vuejs.org/) stores for theme and language                                   |
| Styling   | [Tailwind CSS v4](https://tailwindcss.com/) with design tokens and custom utilities in `main.css` |
| Motion    | [`@vueuse/motion`](https://motion.vueuse.org/) presets, Vue `<Transition>`, CSS keyframes         |
| Utilities | [`@vueuse/core`](https://vueuse.org/) (media queries, scroll, key strokes)                        |
| Icons     | [`@lucide/vue`](https://lucide.dev/) plus custom SVG brand icons                                  |
| Build     | [Vite 8](https://vite.dev/)                                                                       |
| Quality   | Oxlint, ESLint (flat config), Prettier (+ Tailwind plugin), Husky + lint-staged                   |
| Hosting   | GitHub Pages via GitHub Actions                                                                   |

---

## Project structure

```text
.
├── .agents/rules/              # Path-specific guidelines for AI coding agents
├── .github/
│   ├── workflows/deploy.yml    # CI (lint, format, build) + GitHub Pages deployment
│   └── dependabot.yml          # Weekly grouped dependency updates
├── .husky/pre-commit           # Runs lint-staged
├── public/                     # Served as-is: favicon, OG image, robots, sitemap
│   └── docs/                   # CV (EN/IT) and thesis PDFs
├── src/
│   ├── assets/
│   │   ├── images/             # Optimised images (profile.webp)
│   │   └── styles/main.css     # Tailwind entry: tokens, utilities, keyframes, base styles
│   ├── components/
│   │   ├── about/              # JourneyTimeline
│   │   ├── common/             # SectionHeader, RichText, ThemeToggle, LanguageSwitcher,
│   │   │                       # SocialLinks, BackToTop
│   │   ├── contact/            # ContactCard, ContactForm, FormField, FormAlert, SendButton
│   │   ├── icons/              # LogoIcon, GitHubIcon, LinkedinIcon
│   │   ├── layout/             # AppHeader, MobileNavDrawer, AppFooter, AmbientBackground
│   │   ├── projects/           # ProjectGrid, ProjectCard, ProjectDetailsDialog,
│   │   │                       # ProjectFilterTabs, ProjectLinks, ProjectBadge
│   │   └── skills/             # SkillCard
│   ├── composables/            # useActiveSection, useScrollProgress, useSpotlight
│   ├── data/                   # Static content: projects, skills, journey, socials
│   ├── i18n/                   # en.js, it.js (UI strings) and index.js (languages, CV files)
│   ├── plugins/motion.js       # v-motion-* presets (reduced-motion aware)
│   ├── sections/               # Page sections: Hero, About, Skills, Projects, Contact
│   ├── stores/                 # Pinia: theme.js, language.js
│   ├── utils/                  # localize.js ({ en, it } resolver), storage.js (safe localStorage)
│   ├── App.vue                 # Page layout
│   └── main.js                 # App bootstrap
├── index.html                  # HTML shell, SEO tags, anti-flash theme script
├── AGENTS.md                   # Instructions for AI coding agents
└── vite.config.js
```

---

## Local development

**Prerequisites:** Node.js `^20.19.0 || >=22.12.0` and npm 10+.

```bash
git clone https://github.com/simo-macca/simo-macca.github.io.git
cd simo-macca.github.io
npm ci
npm run dev        # http://localhost:3000
```

### Environment variables (optional)

Copy [`.env.example`](.env.example) to `.env.local`:

| Variable                | Purpose              | When missing                               |
| :---------------------- | :------------------- | :----------------------------------------- |
| `VITE_WEB3FORMS_KEY`    | Web3Forms access key | The form simulates a successful submission |
| `VITE_HCAPTCHA_SITEKEY` | hCaptcha site key    | The captcha is not rendered                |

In production both come from the repository's **Actions secrets**.

### Scripts

| Command                | Action                                                       |
| :--------------------- | :----------------------------------------------------------- |
| `npm run dev`          | Vite dev server with hot reload (port 3000)                  |
| `npm run build`        | Production build into `dist/`                                |
| `npm run preview`      | Serve the production build (port 8080)                       |
| `npm run lint`         | Oxlint + ESLint with auto-fix                                |
| `npm run lint:check`   | Oxlint + ESLint without fixing; fails on any warning (CI)    |
| `npm run format`       | Format all files with Prettier                               |
| `npm run format:check` | Check formatting without writing (CI)                        |
| `npm run check`        | `lint:check` + `format:check` + `build`, the same gate as CI |

The Husky pre-commit hook runs lint-staged (Oxlint, ESLint and Prettier with auto-fix) on staged files.

---

## Editing content

| To change…                         | Edit                                           |
| :--------------------------------- | :--------------------------------------------- |
| A project, its links or order      | `src/data/projects.js`                         |
| Skills                             | `src/data/skills.js`                           |
| Education / experience timeline    | `src/data/journey.js`                          |
| Email, GitHub, LinkedIn, nav links | `src/data/socials.js`                          |
| Any UI text                        | `src/i18n/en.js` **and** `src/i18n/it.js`      |
| CV or thesis PDF                   | Replace the file in `public/docs/` (same name) |

Translatable data fields are written as `{ en: '…', it: '…' }` and resolved with `languageStore.localized(data)`.

---

## CI/CD

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push and pull request to `main`:

1. **Build job**: `npm ci` → `lint:check` → `format:check` → `build` (with the form secrets).
2. **Deploy job** (push to `main` or manual run only): publishes `dist/` to GitHub Pages.

Pull-request runs never deploy, and a deployment in progress is never cancelled. Dependabot opens grouped weekly updates for npm packages and GitHub Actions.
