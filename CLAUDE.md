# Portfolio: simo-macca.github.io

Personal portfolio of **Simone Maccario** ([simo-macca.github.io](https://simo-macca.github.io)): a bilingual (EN/IT) single-page site built with Vue 3, Tailwind CSS v4 and Vite, deployed to GitHub Pages.

- Architecture and folder map: [`.claude/context/overview.md`](.claude/context/overview.md)
- Decisions log: [`.claude/context/decisions.md`](.claude/context/decisions.md)
- Path-scoped rules (loaded automatically):

| Rule file                                        | Applies to                           |
| :----------------------------------------------- | :----------------------------------- |
| [`components.md`](.claude/rules/components.md)   | `src/{components,sections}/**/*.vue` |
| [`state-logic.md`](.claude/rules/state-logic.md) | `src/{stores,data,i18n}/**/*.js`     |

## Commands

```bash
npm run dev           # dev server on http://localhost:3000
npm run check         # verify everything: lint:check + format:check + build (what CI runs)
npm run build         # production build into dist/
npm run fix           # auto-fix lint + format: only as the global formatter rule allows
# Building blocks: lint, lint:check, format, format:check
```

## Testing policy (important)

> [!IMPORTANT]
> There is **no** unit/E2E test suite (no Vitest, Jest, Cypress or Playwright) in this repository.
>
> - Do **not** run `npm test` or add test runners unless the user explicitly asks.
> - Verify every change with `npm run check` (lint → format check → build), the single gate CI also runs.
> - For UI changes, also check the page at a phone width (~375 px) and a desktop width (~1440 px), in both themes and both languages.

## Content accuracy

- Project descriptions must match what the linked repository actually contains (stack, team size, role, numbers). Course names, dates and results come from the repo, report or CV.
- The **Bachelor's thesis source code is private.** Never add a repository link, internal file names, database names or other non-public details for it. Only the published thesis PDF (`public/docs/thesis.pdf`) may be linked.
- Every user-visible string must exist in **both** `en.js` and `it.js` (or as an `{ en, it }` pair in data).
- Browser storage must go through `src/utils/storage.js` (it never throws).

## Git hooks

The pre-commit hook runs lint-staged (`oxlint --fix`, `eslint --fix`, `prettier --write`) on staged files.

## CI/CD

`.github/workflows/deploy.yml` runs `npm run check` (lint, format check, build) on every push and pull request to `main`, then deploys `dist/` to GitHub Pages for pushes to `main` only. The contact form keys (`VITE_WEB3FORMS_KEY`, `VITE_HCAPTCHA_SITEKEY`) are repository secrets; never commit them. `.github/dependabot.yml` keeps npm packages and Actions up to date.
