---
description: Vue 3 SFC conventions, Tailwind CSS v4 patterns, icons, motion, i18n and accessibility for components and sections
globs: 'src/{components,sections}/**/*.vue'
trigger: glob
---

# Vue Components & Sections

Applies to every SFC in `src/components/**` and `src/sections/**`.

## 1. Where files go

| Folder                  | Contents                                                                           |
| :---------------------- | :--------------------------------------------------------------------------------- |
| `src/sections/`         | One component per page section (`HeroSection`, `AboutSection`, …)                  |
| `src/components/layout` | Page chrome: `AppHeader`, `MobileNavDrawer`, `AppFooter`, `AmbientBackground`      |
| `src/components/common` | Reusable, domain-free pieces: `SectionHeader`, `RichText`, `TechMarquee`, …        |
| `src/components/<area>` | Pieces of one area: `projects/`, `contact/`, `skills/`, `about/`                   |
| `src/components/icons`  | Custom SVG icons (brand marks, logo)                                               |
| `src/composables/`      | Reusable logic (`useActiveSection`, `useSlidingIndicator`, `useViewTransition`, …) |
| `src/directives/`       | Global directives (`v-reveal`)                                                     |

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
  - `surface-interactive`: hover lift, accent border and shadow for clickable cards
  - `btn-primary`, `btn-secondary`, `icon-button`: pill buttons (height/padding added per use)
  - `chip`: monospace technology tag; `eyebrow`: small uppercase mono label
  - `focus-ring`: visible keyboard focus ring
  - `spotlight`: cursor-following highlight (pair with `useSpotlight().onPointerMove`)
  - `fade-x`: soft horizontal edge fade (marquee)
- Colour tokens: slate for light mode; `night-950/900/800/700` (surfaces) and `mist-100/300/400` (text) for dark mode; `brand-*` (blue-violet, defined in `@theme`) for accents and interactive states. Never use raw `sky-*`/`indigo-*` for accents. Example: `text-slate-900 dark:text-mist-100`, `text-brand-600 dark:text-brand-300`.
- Easing: `ease-out-expo` for movement, durations of 300–700 ms. Animate only `transform`/`translate`/`scale`/`rotate`/`opacity`/colours, never layout properties.
- Do not add a `tailwind.config.js`; extend `@theme` in `main.css` instead.

### Default classes first, no hard-coded values

Always use Tailwind's own scale before reaching for an arbitrary value (`foo-[...]`):

| Instead of                          | Use                                                           | Why                                                                             |
| :---------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| `h-[18px] w-[18px]`, `h-[56rem]`    | `size-4.5`, `h-224`                                           | v4 spacing accepts any multiple of 0.25rem                                      |
| `text-[16px]`, `text-[2.25rem]`     | `text-base`, `text-4xl`                                       | type scale                                                                      |
| `rounded-[2rem]`                    | `rounded-4xl`                                                 | radius scale                                                                    |
| `tracking-[-0.05em]`, `leading-[1]` | `tracking-tighter`, `leading-none`                            | letter-spacing / line-height scale                                              |
| `scale-[0.98]`, `opacity-[0.6]`     | `scale-98`, `opacity-60`                                      | numeric utilities take bare numbers                                             |
| `transition-[color,translate]`      | `transition` (or `transition-colors`, `transition-transform`) | the default `transition` already covers colours, opacity, shadow and transforms |
| `bg-[radial-gradient(...)]`         | `bg-radial from-… to-…`, `bg-conic-180 …`, `bg-linear-to-r …` | gradient utilities                                                              |
| `left-[50%]`, `w-[33.333%]`         | `left-1/2`, `w-1/3`                                           | fractions                                                                       |

Rules:

1. If the exact value is not on the scale, pick the **nearest default** unless the difference is visibly wrong. Pixel-perfect matching of a mock-up is not a reason for an arbitrary value.
2. If a value is needed in **two or more places** and has no default (a custom font size, shadow, colour, easing), add a token to `@theme` in `main.css` and use the generated class (e.g. `--text-2xs` → `text-2xs`, `--shadow-card` → `shadow-card`). Long one-off backgrounds or masks go into an `@utility`.
3. Arbitrary values are acceptable only when Tailwind has no way to express them: `calc()` / `min()` / `max()` / `env()` (safe areas), viewport-height limits (`max-h-[92svh]`), custom grid templates (`grid-cols-[1.4fr_1fr]`) and `var(--…)` references.
4. Never hard-code hex/rgb colours in class names; use the palette or a `@theme` colour token.
5. The Prettier Tailwind plugin rewrites some arbitrary values to their canonical class on save/commit; still write the canonical form yourself.

## 4. Icons

- UI icons: `@lucide/vue` only, using the canonical names (e.g. `CodeXml`, `LoaderCircle`, `CircleCheck`, not the aliases `Code2`, `Loader2`, `CheckCircle2`). Verify the export exists.
- No emoji and no decorative sparkle icons in the UI; an icon must carry meaning. Sizes: `h-4 w-4` inline, `h-5 w-5` in tiles.
- Brand/custom icons: `src/components/icons/` (`LogoIcon`, `GitHubIcon`, `LinkedinIcon`), all using `currentColor`.
- Decorative icons get `aria-hidden="true"`; an icon-only button needs an `aria-label` (and usually a `title`).

## 5. Motion

- Scroll entrances use `v-reveal`: `v-reveal` (rise), `v-reveal:left|right|down|scale|fade`, with the delay in ms as the value (`v-reveal:left="120"`). Stagger lists with `index * 80–120`.
- `v-reveal` uses the Web Animations API and leaves no inline `transform`, so it can sit on elements that have their own hover transforms. Inside a `<TransitionGroup>` put it on an inner wrapper so it does not fight the list transition.
- Use `<Transition>` / `<TransitionGroup>` for enter/leave and re-ordering; native `<dialog>` open/close is animated in CSS with `@starting-style`.
- Theme and language switches go through `withViewTransition()` (`useViewTransition.js`).
- Reduced motion is handled globally (`v-reveal` is skipped, CSS durations collapse, view transitions are bypassed). Infinite decorative animations should also carry `motion-reduce:hidden` / `motion-reduce:animate-none`.

## 6. Accessibility & mobile

- Touch targets at least 40×40 px (44 px preferred).
- Keyboard: every action reachable with Tab and operable with Enter/Space; visible focus via `focus-ring`.
- Keep ARIA in sync with state: `aria-expanded` (menus), `aria-pressed` (toggle groups such as the filter and language switcher), `aria-current="location"` (active nav link).
- Sliding "pill" indicators use `useSlidingIndicator` with `data-indicator-key` on each item.
- Modals use the native `<dialog>` with `showModal()` (see `ProjectDetailsDialog.vue`): focus trap, Escape and focus restoration come for free; the page scroll is locked by CSS.
- When a whole card is clickable, ignore clicks whose target is inside an `a` or `button` so nested links keep working.
- Form inputs use `text-base` on mobile (prevents iOS zoom) and link errors with `aria-describedby`.
- Check every change at ~375 px and ~1440 px, in light and dark mode, in English and Italian.
