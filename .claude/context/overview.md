# Architecture Overview

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
