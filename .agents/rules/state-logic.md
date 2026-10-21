---
description: Pinia store conventions and static data structures in src/data/
globs: 'src/{stores,data}/**/*.js'
trigger: glob
---

# State Management & Static Data Conventions

These rules apply to all state stores and static data modules under `src/{stores,data}/**/*.js`.

---

## 1. Pinia Store Conventions (`src/stores/`)

- **Store Definition:** Use Pinia's `defineStore` syntax (e.g., `useThemeStore` in `src/stores/ThemeStore.js`).
- **Browser & SSR Safety:** Always guard browser-only APIs (`window`, `document`, `localStorage`, `matchMedia`) with `typeof window !== 'undefined'` checks before invocation.
- **Reactive Theme Synchronization:**
  - Synchronize dark/light mode with system preference (`prefers-color-scheme: dark`) and persistent storage (`localStorage.getItem('theme')`).
  - Support cross-tab syncing via `window.addEventListener('storage', ...)` to reflect preference changes across active tabs.
  - Encapsulate DOM side-effects (e.g., toggling `.dark` on `document.documentElement`, synchronizing `<meta name="color-scheme">`) cleanly within store actions.
- **Deterministic Mutations:** State mutations must be deterministic and predictable. Avoid uncontrolled side-effects inside state getters.

---

## 2. Static Data Models (`src/data/`)

All static content (projects, skills, navigation, contact methods) resides in `src/data/` as clean, immutable JavaScript data models.

### A. Project Case Study Schema (`src/data/projects.js`)

Every project entry in the `projects` array must strictly conform to the following schema:

```javascript
{
  id: 'project-slug',                     // Unique kebab-case identifier
  title: 'Display Title',                  // Clean project title
  category: 'personal' | 'university' | 'thesis', // Matches projectCategories filter ID
  role: 'Technical Role & Team Format',   // Role first, e.g. "Full-Stack Lead & Group Team"
  domain: 'Architectural Domain',         // Domain badge string
  contextBadge: 'Context Label',          // "Personal Project" | "University Project" | "Bachelor's Thesis"
  isFlagship: false,                      // Boolean: adds top gradient highlight & badge if true
  noSourceCode: false,                    // Boolean: displays "No Source Code" pill if true
  summary: '1-2 sentence overview',       // Concise preview summary displayed in collapsed cards
  challenge: 'Problem statement',         // Deep technical difficulty and engineering hurdles
  architecture: 'Technical decisions',    // Concrete stack, design patterns, protocols, and libraries
  tags: ['Tech1', 'Tech2'],               // Array of technology badges
  links: {
    github: 'https://github.com/...',     // GitHub URL or null
    demo: 'https://...',                  // Live demo URL or null
    pdf: '/docs/...',                     // Path to PDF paper/thesis or null
  },
}
```

- **Role Standard:** Always place the candidate's specialized role first, followed by the collaboration context (e.g., `Full-Stack Lead & Group Team`, `Back-End Lead & Duo Team`, `Software Engineer & Duo Team`, `Solo Developer & Architect`).
- **Summary vs. Challenge/Architecture:** The `summary` is displayed in the card's collapsed preview state, whereas `challenge` and `architecture` are disclosed when expanding the card accordion.

### B. Technical Skills Matrix (`src/data/skills.js`)

- Maintain the 4-quadrant categorization: `systems`, `intelligence`, `frontend`, and `devops`.
- Each category must provide: `id`, `topic`, `categoryIcon` (Lucide Vue component), `description`, and `skills` (string array of concrete technologies and domains).

### C. Social Channels & Navigation (`src/data/socials.js`)

- `navLinks`: Anchor navigation list (`href`, `label`).
- `contactMethods`: Accessible channels with `icon` (Lucide or custom SVG from `src/components/icons/`), `title`, `value`, `link`, and `description`.

### D. Purity & Immutability

- Static data files must export immutable data constants.
- **NEVER** introduce runtime state, API fetching logic, or side-effects inside files within `src/data/`.
