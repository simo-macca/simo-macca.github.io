---
description: Vue 3 SFC (<script setup>), Tailwind CSS utility patterns, icon usage, and mobile accessibility rules
globs: 'src/components/**/*.vue'
trigger: glob
---

# Vue 3 Component & UI Guidelines

These guidelines apply to all Single File Components (SFCs) under `src/components/**/*.vue`.

---

## 1. Vue 3 Composition API & SFC Conventions

- **`<script setup>` Syntax:** Always use `<script setup>` syntax for Single File Components.
- **Props & Emits Declaration:**
  - Declare component props with `defineProps({ ... })` using explicit runtime types (`type: Object`, `type: Boolean`, `type: Array`) and `required` / `default` flags.
  - Declare component events with `defineEmits([...])`.
  - **ESLint Rule:** Do not assign `const props = defineProps(...)` if props are only referenced in the `<template>` block; use bare `defineProps({ ... })` or prefix with `_props` to avoid `no-unused-vars` errors.
- **Component Modularity:** Decompose complex UI sections into focused sub-components (e.g., `src/components/projects/` contains `ProjectBadge.vue`, `ProjectCard.vue`, `ProjectGrid.vue`, `ProjectFilterTabs.vue`).

---

## 2. Tailwind CSS v4 Utility Patterns

- **Native Tailwind v4 Directives:** All utilities derive from `@import 'tailwindcss';` defined in `src/assets/main.css`.
- **Color System & Dark Mode:**
  - Use semantic slate shades for text and borders:
    - Light mode: `text-slate-900`, `text-slate-600`, `border-slate-200/80`, `bg-white/90`
    - Dark mode: `dark:text-[#F3F4F6]`, `dark:text-[#9CA3AF]`, `dark:border-white/8`, `dark:bg-[#111827]/80`
  - Use sky accent tokens for interactive states, links, and focus rings:
    - `text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300`
    - `bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400`
    - `focus-visible:ring-2 focus-visible:ring-sky-500`
- **Smooth Transitions & Animations:**
  - Avoid instant snapping; apply smooth CSS transitions: `transition-all duration-300 ease-in-out` or `transition-transform duration-300`.
  - For expandable/collapsible content, use **CSS Grid transitions** (`grid-template-rows: 0fr` to `1fr` with `overflow-hidden`) combined with `:root { interpolate-size: allow-keywords; }` rather than brittle pixel-based `max-height` hacks.
- **Responsive Prefixes:** Always develop mobile-first, progressively applying `sm:`, `md:`, and `lg:` breakpoints.

---

## 3. Icon Usage Standards

- **UI & Navigation Icons:** Import generic UI icons from `@lucide/vue` (e.g., `ChevronDown`, `ExternalLink`, `FileText`, `Sparkles`, `ArrowUpRight`, `Mail`, `MapPin`).
- **Brand & Custom SVGs:** Import custom brand icons directly from `src/components/icons/` (e.g., `GitHubIcon.vue`, `LinkedinIcon.vue`, `IconLogoPortfolio.vue`).
- **Accessibility:**
  - Mark decorative icons with `aria-hidden="true"` when accompanied by descriptive text.
  - Provide explicit `aria-label` or screen-reader text when an icon button is standalone.

---

## 4. Mobile Accessibility & Touch Interactions

- **Touch Targets:** Maintain comfortable touch hitboxes on mobile devices (minimum 36×36px or 44×44px interactive tap area).
- **Keyboard Navigation:** Support keyboard navigation on all interactive elements:
  - Handle `@keydown.enter.prevent` and `@keydown.space.prevent`.
  - Provide visible focus indicators using `focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none`.
- **State Synchronization:** Keep ARIA state synchronized with reactive data (e.g., `:aria-expanded="isExpanded"` on toggle buttons).
- **Click Propagation in Tappable Surfaces:** When an entire card or container is tappable on mobile viewports, always attach `@click.stop` to nested interactive elements (`<a>`, external buttons) to prevent triggering parent container toggles.
