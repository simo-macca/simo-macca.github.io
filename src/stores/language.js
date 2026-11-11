import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { cvFiles, DEFAULT_LANGUAGE, isSupportedLanguage, messages } from '@/i18n/index.js'
import { localize } from '@/utils/localize.js'
import { readStorage, STORAGE_KEYS, writeStorage } from '@/utils/storage.js'

const isBrowser = typeof window !== 'undefined'

/** Stored preference first, then the browser language, then English. */
function detectInitialLanguage() {
  const stored = readStorage(STORAGE_KEYS.language)
  if (isSupportedLanguage(stored)) return stored
  if (!isBrowser) return DEFAULT_LANGUAGE

  const preferred = (navigator.languages ?? [navigator.language])
    .filter(Boolean)
    .map((lang) => lang.slice(0, 2).toLowerCase())
    .find(isSupportedLanguage)

  return preferred ?? DEFAULT_LANGUAGE
}

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref(detectInitialLanguage())
  let initialized = false

  const isItalian = computed(() => currentLanguage.value === 'it')
  const isEnglish = computed(() => currentLanguage.value === 'en')
  /** UI strings for the active language. */
  const t = computed(() => messages[currentLanguage.value] ?? messages[DEFAULT_LANGUAGE])
  const cv = computed(() => cvFiles[currentLanguage.value] ?? cvFiles[DEFAULT_LANGUAGE])

  /** Resolve `{ en, it }` pairs inside static data for the active language. */
  const localized = (data) => localize(data, currentLanguage.value)

  function applyToDocument() {
    if (!isBrowser) return
    document.documentElement.lang = currentLanguage.value
    document.title = t.value.meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.value.meta.description)
  }

  function setLanguage(lang, { persist = true } = {}) {
    if (!isSupportedLanguage(lang)) return
    currentLanguage.value = lang
    if (persist) writeStorage(STORAGE_KEYS.language, lang)
    applyToDocument()
  }

  /** Applies the language to the document and keeps tabs in sync. Idempotent. */
  function initLanguage() {
    if (!isBrowser || initialized) return
    initialized = true

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEYS.language && isSupportedLanguage(event.newValue)) {
        setLanguage(event.newValue, { persist: false })
      }
    })

    applyToDocument()
  }

  return { currentLanguage, isItalian, isEnglish, t, cv, localized, setLanguage, initLanguage }
})
