/**
 * Resolves bilingual values in static data.
 *
 * Data files describe translatable fields as `{ en: '...', it: '...' }`.
 * `localize(data, 'it')` walks plain objects and arrays and replaces every such
 * pair with the string for the requested language (falling back to English).
 * Values under keys listed in `SKIP_KEYS` (Vue components such as icons) are
 * returned untouched so component identity is preserved.
 */

const SKIP_KEYS = new Set(['icon'])

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype

const isLocalizedPair = (value) => isPlainObject(value) && 'en' in value && 'it' in value

export function localize(value, lang = 'en') {
  if (isLocalizedPair(value)) return value[lang] ?? value.en
  if (Array.isArray(value)) return value.map((item) => localize(item, lang))
  if (!isPlainObject(value)) return value

  return Object.fromEntries(
    Object.entries(value).map(([key, inner]) => [
      key,
      SKIP_KEYS.has(key) ? inner : localize(inner, lang),
    ]),
  )
}
