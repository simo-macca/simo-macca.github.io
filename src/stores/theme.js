import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/utils/storage.js'

const isBrowser = typeof window !== 'undefined'
const DARK_QUERY = '(prefers-color-scheme: dark)'

const parseStoredTheme = (value) => (value === 'dark' || value === 'light' ? value : null)
const systemPrefersDark = () => isBrowser && window.matchMedia(DARK_QUERY).matches

/**
 * Light/dark theme.
 *
 * - Without a stored choice the theme follows the operating system live.
 * - An explicit toggle is persisted and synchronised across open tabs.
 * - `index.html` applies the same logic before first paint to avoid a flash.
 */
export const useThemeStore = defineStore('theme', () => {
  const storedTheme = ref(parseStoredTheme(readStorage(STORAGE_KEYS.theme)))
  const isDark = ref(storedTheme.value ? storedTheme.value === 'dark' : systemPrefersDark())
  let initialized = false

  function applyToDocument() {
    if (!isBrowser) return
    document.documentElement.classList.toggle('dark', isDark.value)
    document
      .querySelector('meta[name="color-scheme"]')
      ?.setAttribute('content', storedTheme.value ?? 'light dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', isDark.value ? '#0b0f17' : '#f8fafc')
  }

  function toggle() {
    isDark.value = !isDark.value
    storedTheme.value = isDark.value ? 'dark' : 'light'
    writeStorage(STORAGE_KEYS.theme, storedTheme.value)
    applyToDocument()
  }

  /** Registers system/tab listeners and applies the theme. Idempotent. */
  function initTheme() {
    if (!isBrowser || initialized) return
    initialized = true

    window.matchMedia(DARK_QUERY).addEventListener('change', (event) => {
      if (storedTheme.value) return
      isDark.value = event.matches
      applyToDocument()
    })

    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEYS.theme) return
      storedTheme.value = parseStoredTheme(event.newValue)
      isDark.value = storedTheme.value ? storedTheme.value === 'dark' : systemPrefersDark()
      applyToDocument()
    })

    applyToDocument()
  }

  return { isDark, toggle, initTheme }
})
