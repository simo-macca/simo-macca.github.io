---
description: Vue 3 SFC conventions, Tailwind CSS v4 patterns, icons, motion, i18n and accessibility for components and sections
globs: 'src/{components,sections}/**/*.vue'
trigger: glob
---

# Vue Components & Sections

Applies to every SFC in `src/components/**` and `src/sections/**`.

## 1. Where files go

| Folder                  | Contents                                                                      |
| :---------------------- | :---------------------------------------------------------------------------- |
| `src/sections/`         | One component per page section (`HeroSection`, `AboutSection`, …)             |
| `src/components/layout` | Page chrome: `AppHeader`, `MobileNavDrawer`, `AppFooter`, `AmbientBackground` |
| `src/components/common` | Reusable, domain-free pieces: `SectionHeader`, `RichText`, `ThemeToggle`, …   |
| `src/components/<area>` | Pieces of one area: `projects/`, `contact/`, `skills/`, `about/`              |
| `src/components/icons`  | Custom SVG icons (brand marks, logo)                                          |
| `src/composables/`      | Reusable logic (`useActiveSection`, `useScrollProgress`, `useSpotlight`)      |

Name components in PascalCase after what they are (`ProjectCard.vue`), without a `Component` suffix. A section should mostly compose smaller components; split a component when it mixes several responsibilities or grows past ~150 lines of template.

## 2. SFC conventions

- Always `<script setup>`; block order `script` → `template` → `style` (enforced by ESLint).
- Props via `defineProps({ ... })` with runtime `type`, `required` / `default` and a `validator` for string enums. Assign `const props = defineProps(...)` only when the script uses `props`.
- Events via `defineEmits([...])`; use `defineModel()` for `v-model` inputs.
- Use the `@/` alias for imports outside the current folder.
- Read UI text from the language store (`languageStore.t.<section>.<key>`) and localise data with `languageStore.localized(data)`. Never hard-code visible text or `aria-label`s.
- Bilingual sentences with emphasis are arrays of segments rendered by `RichText.vue`, never `v-html`.

## 3. Tailwind CSS v4

- Mobile-first: base classes for phones, then `sm:` / `md:` / `lg:`.
- Shared utilities defined in `src/assets/styles/main.css`; prefer them to repeating long class lists:
  - `surface-card`: standard card surface (border, background, blur, radius, dark variant)
  - `btn-primary`, `btn-secondary`, `icon-button`: buttons (sizing/padding added per use)
  - `focus-ring`: visible keyboard focus ring
  - `spotlight`: cursor-following highlight (pair with `useSpotlight().onPointerMove`)
- Colour tokens: slate for light mode; `night-950/900/800` (surfaces) and `mist-100/400` (text) for dark mode; sky for accents and interactive states. Example: `text-slate-900 dark:text-mist-100`, `dark:bg-night-900/80`.
- Do not add a `tailwind.config.js`; extend `@theme` in `main.css` instead.

## 4. Icons

- UI icons: `@lucide/vue` (verify the export exists, e.g. `CodeXml`, not the alias `Code2`).
- Brand/custom icons: `src/components/icons/` (`LogoIcon`, `GitHubIcon`, `LinkedinIcon`), all using `currentColor`.
- Decorative icons get `aria-hidden="true"`; an icon-only button needs an `aria-label` (and usually a `title`).

## 5. Motion

- Entrance animations use the presets from `src/plugins/motion.js`: `v-motion-slide-up|down|left|right`, `v-motion-pop-in`, `v-motion-fade-in`, with `:delay`.
- **Never** put a `v-motion-*` directive on an element that also animates `transform` on hover (e.g. `hover:-translate-y-1`): motion writes an inline `transform` that overrides the hover. Put the directive on a wrapper element instead.
- Use `<Transition>` / `<TransitionGroup>` for enter/leave and re-ordering.
- Reduced motion is handled globally (motion presets start in their final state, CSS durations collapse). Infinite decorative animations should also carry `motion-reduce:hidden` or similar when they convey nothing.

## 6. Accessibility & mobile

- Touch targets at least 40×40 px (44 px preferred).
- Keyboard: every action reachable with Tab and operable with Enter/Space; visible focus via `focus-ring`.
- Keep ARIA in sync with state: `aria-expanded` (menus), `aria-pressed` (toggle groups such as the filter and language switcher), `aria-current="location"` (active nav link).
- Modals use the native `<dialog>` with `showModal()` (see `ProjectDetailsDialog.vue`): focus trap, Escape and focus restoration come for free; the page scroll is locked by CSS.
- When a whole card is clickable, ignore clicks whose target is inside an `a` or `button` so nested links keep working.
- Form inputs use `text-base` on mobile (prevents iOS zoom) and link errors with `aria-describedby`.
- Check every change at ~375 px and ~1440 px, in light and dark mode, in English and Italian.
