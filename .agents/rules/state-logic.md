---
description: Pinia stores, i18n files and static data schemas (projects, skills, journey, socials)
globs: 'src/{stores,data,i18n}/**/*.js'
trigger: glob
---

# Stores, Translations & Static Data

Applies to `src/stores/**`, `src/data/**` and `src/i18n/**`.

## 1. Pinia stores (`src/stores/`)

- Setup-style stores: `defineStore('id', () => { ... return { ... } })`, files named after the store (`theme.js` → `useThemeStore`, `language.js` → `useLanguageStore`).
- Guard browser APIs (`window`, `document`, `navigator`, `matchMedia`) with `typeof window !== 'undefined'`.
- Never call `localStorage` directly: use `readStorage` / `writeStorage` and `STORAGE_KEYS` from `src/utils/storage.js`.
- `init*()` actions register global listeners and must be idempotent (guarded by an `initialized` flag). They are called once in `main.js` before mounting.
- DOM side effects (classes on `<html>`, meta tags, `document.title`) live in one `applyToDocument()` function per store.

### Theme (`theme.js`)

- No stored value → follow `prefers-color-scheme` live. After `toggle()` → persist `'dark' | 'light'`.
- Sync across tabs with the `storage` event; keep `meta[name=color-scheme]` and `meta[name=theme-color]` updated.
- `index.html` contains an inline script with the same logic to avoid a flash; keep both in sync.

### Language (`language.js`)

- Initial language: stored value → browser language (`navigator.languages`) → `'en'`.
- Exposes `currentLanguage`, `isEnglish`, `isItalian`, `t`, `cv`, `localized(data)`, `setLanguage(lang)`, `initLanguage()`.

## 2. Translations (`src/i18n/`)

- `en.js` and `it.js` must have **exactly the same shape**. Add every key to both files in the same change.
- Group keys by section (`hero`, `about`, `skills`, `projects`, `contact`, `footer`) plus `meta`, `a11y`, `nav`, `languageSwitcher`.
- Accessible labels belong in `a11y` (or next to their section) and are translated like visible text.
- Emphasised sentences are segment arrays: `['Hi, I am ', { strong: 'Simone' }, '.']`.
- `index.js` exports `SUPPORTED_LANGUAGES`, `DEFAULT_LANGUAGE`, `messages` and `cvFiles`.

## 3. Static data (`src/data/`)

- Export frozen constants (`Object.freeze([...])`). No functions that depend on the language, no state, no fetching, no side effects.
- Translatable values are `{ en: '...', it: '...' }` pairs; language-independent values are plain strings. Components resolve them with `languageStore.localized(data)`.
- Vue components (icons) go under the key `icon`, which `localize()` leaves untouched.

### Project schema (`projects.js`)

```js
{
  id: 'project-slug',                 // unique kebab-case id, also used for #project-<id>
  category: 'personal' | 'university' | 'thesis',
  icon: LucideIcon,                   // card and dialog icon
  isFlagship: false,                  // gradient accent + "Featured" badge
  title: 'Name' | { en, it },
  domain: { en, it },                 // short area badge, e.g. "SAT Encoding & Planning"
  role: { en, it },                   // "<role> · <team size>", e.g. "Back-end lead · team of 2"
  context: { en, it },                // course / institution / year, only if verifiable
  summary: { en, it },                // 1–2 sentences, shown on the card
  challenge: { en, it },              // the problem (dialog)
  approach: { en, it },               // architecture and decisions, including your own part (dialog)
  highlights: [{ en, it }],           // short factual results (dialog)
  tags: ['Tech', { en, it }],         // first five appear on the card
  links: { github: url | null, demo: url | null, pdf: '/docs/x.pdf' | null },
}
```

- Order in the array is the display order. Add new categories to `projectCategoryIds` and to `projects.categories` / `projects.contextBadges` in both translation files; empty categories are hidden automatically.
- `links.github: null` renders "Private source code". The thesis must stay that way.
- Facts (stack, numbers, team size, role) must come from the project's repository, report or CV; never invent them.

### Skills (`skills.js`)

Four categories, each `{ id, icon, topic, description, skills }`; `skills` is an array of strings or `{ en, it }` pairs.

### Journey (`journey.js`)

Newest first: `{ id, type: 'education' | 'experience', icon, period, title, organization, detail }`.

### Socials (`socials.js`)

- `profileLinks`: the single source for the email, GitHub, LinkedIn and site URLs.
- `navLinks`: `{ id, labelKey }`, where `id` is a section id and `labelKey` a key of `t.nav`.
- `socialLinks`: footer icons, `{ id, href, icon, ariaKey }` (`ariaKey` in `t.a11y`).
- `contactMethods`: `{ id, icon, title | titleKey, value | valueKey, href, descriptionKey, external }`; keys point into `t.contact.methods`.
