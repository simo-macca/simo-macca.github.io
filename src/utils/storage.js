/**
 * Safe wrappers around `localStorage`.
 *
 * Accessing `localStorage` throws in some environments (Safari private mode with
 * storage blocked, sandboxed iframes, disabled cookies). Every read/write goes
 * through these helpers so a storage failure never breaks the app.
 */

const isBrowser = typeof window !== 'undefined'

export const STORAGE_KEYS = Object.freeze({
  theme: 'theme',
  language: 'portfolio_language',
})

export function readStorage(key) {
  if (!isBrowser) return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key, value) {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Storage unavailable: the preference simply is not persisted.
  }
}
