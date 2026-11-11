import en from './en.js'
import it from './it.js'

export const SUPPORTED_LANGUAGES = Object.freeze(['en', 'it'])
export const DEFAULT_LANGUAGE = 'en'

export const messages = Object.freeze({ en, it })

export const isSupportedLanguage = (lang) => SUPPORTED_LANGUAGES.includes(lang)

/** CV file served from `public/docs/` for each language. */
export const cvFiles = Object.freeze({
  en: { href: '/docs/CV_en.pdf', fileName: 'Simone_Maccario_CV_en.pdf' },
  it: { href: '/docs/CV_it.pdf', fileName: 'Simone_Maccario_CV_it.pdf' },
})
