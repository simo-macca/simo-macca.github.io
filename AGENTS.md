# Repository Guidelines for AI Agents

This repository is the personal portfolio of **Simone Maccario** ([simo-macca.github.io](https://simo-macca.github.io)): a bilingual (EN/IT) single-page site built with Vue 3, Tailwind CSS v4 and Vite, deployed to GitHub Pages.

Path-specific rules live in [`.agents/rules/`](.agents/rules/):

| Rule file                                        | Applies to                           |
| :----------------------------------------------- | :----------------------------------- |
| [`components.md`](.agents/rules/components.md)   | `src/{components,sections}/**/*.vue` |
| [`state-logic.md`](.agents/rules/state-logic.md) | `src/{stores,data,i18n}/**/*.js`     |

---

## 1. Architecture

- **Single page, no router.** `App.vue` stacks the sections in `src/sections/` (`#home`, `#about`, `#skills`, `#projects`, `#contact`). Navigation uses in-page anchors; `useActiveSection` highlights the visible one.
- **State:** two Pinia setup stores.
  - `stores/theme.js`: light/dark, follows the OS until the user toggles, persists to `localStorage` key `theme`, syncs across tabs.
  - `stores/language.js`: `en` / `it`, persists to `portfolio_language`, detects the browser language on first visit, updates `<html lang>`, `document.title` and the meta description. Exposes `t` (UI strings), `cv` (CV file) and `localized(data)`.
- **Content is data.** Projects, skills, journey and links are plain objects in `src/data/`. UI strings are in `src/i18n/en.js` and `src/i18n/it.js`.
- **Styling:** Tailwind v4 configured in `src/assets/styles/main.css` (`@theme` tokens including the `brand` accent scale, `@utility` helpers, keyframes, base styles). There is no `tailwind.config.js`.
- **Motion:** the `v-reveal` directive (`src/directives/reveal.js`, Web Animations API + one shared IntersectionObserver, reduced-motion aware), Vue `<Transition>`, CSS keyframes, and the View Transitions API for theme/language switches (`src/composables/useViewTransition.js`).
- **Deep links:** `#project-<id>` opens that project's dialog (handled in `ProjectsSection.vue`).
- **SEO files:** `public/robots.txt` (CV PDFs disallowed, thesis allowed); `sitemap.xml` is generated at build time by the `sitemap()` plugin in `vite.config.js` (edit `SITEMAP_PATHS` to add pages).
- **Share preview & icons:** `public/og-image.png` (1200×630 card in the site's style), `public/favicon.svg`, `favicon.ico` (16/32), `apple-touch-icon.png` (iOS) and the Android/PWA icons in `site.webmanifest` (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, logo kept inside the central 80% safe zone) use the brand colours. When the visual identity or headline changes, regenerate them to match and bump the `?v=` query on the `og:image` / `twitter:image` URLs in `index.html`.
- **Browser storage** must go through `src/utils/storage.js` (it never throws).

## 2. Testing policy (important)

> [!IMPORTANT]
> There is **no** unit/E2E test suite (no Vitest, Jest, Cypress or Playwright) in this repository.
>
> - Do **not** run `npm test` or add test runners unless the user explicitly asks.
> - Run `npm run fix` to auto-fix lint issues and formatting, then verify every change with `npm run check` (lint → format check → build), the single gate CI also runs.
> - For UI changes, also check the page at a phone width (~375 px) and a desktop width (~1440 px), in both themes and both languages.

## 3. Working protocol

### A. Act directly

1. Do **not** stop to write or present a plan before working. Read the affected components, data and styles, then start implementing straight away.
2. Make reasonable decisions on your own (layout, naming, edge cases, accessibility) and explain the notable ones in the final summary instead of asking up front. Only stop to ask when a choice is genuinely the owner's to make (content facts, anything published or pushed).
3. Keep existing comments, naming and conventions unless the task is to change them.

### B. Content accuracy

- Project descriptions must match what the linked repository actually contains (stack, team size, role, numbers). Do not invent metrics, course names, dates or results.
- The **Bachelor's thesis source code is private.** Never add a repository link, internal file names, database names or other non-public details for it. Only the published thesis PDF (`public/docs/thesis.pdf`) may be linked.
- Every user-visible string must exist in **both** `en.js` and `it.js` (or as an `{ en, it }` pair in data). Never hard-code UI text in components.

### C. Git

1. Do not commit directly on `main`. Work on a branch such as `feat/...`, `fix/...`, `docs/...` or `chore/...`.
2. The pre-commit hook runs lint-staged (`oxlint --fix`, `eslint --fix`, `prettier --write`) on staged files.
3. If the user asks for changes to stay unstaged, or wants to review a `git diff`, **do not** run `git add`, `git commit` or `git push` until they confirm.
4. Once approved: rebase the branch onto `main`, merge with `git merge --ff-only`, then delete the branch locally and remotely.

## 4. Commands

```bash
npm run dev           # dev server on http://localhost:3000
npm run fix           # auto-fix everything: lint (Oxlint + ESLint) then format (Prettier)
npm run check         # verify everything: lint:check + format:check + build (what CI runs)
npm run build         # production build into dist/
# Building blocks: lint, lint:check, format, format:check
```

## 5. CI/CD

`.github/workflows/deploy.yml` runs `npm run check` (lint, format check, build) on every push and pull request to `main`, then deploys `dist/` to GitHub Pages for pushes to `main` only. The contact form keys (`VITE_WEB3FORMS_KEY`, `VITE_HCAPTCHA_SITEKEY`) are repository secrets; never commit them. `.github/dependabot.yml` keeps npm packages and Actions up to date.
