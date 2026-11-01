import { defineStore } from 'pinia'
import { translations } from '@/data/translations.js'

export const useLanguageStore = defineStore('language', {
  state: () => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('portfolio_language') : null
    return {
      currentLanguage: stored === 'it' ? 'it' : 'en',
      isInitialized: false,
    }
  },

  getters: {
    isItalian: (state) => state.currentLanguage === 'it',
    isEnglish: (state) => state.currentLanguage === 'en',
    t: (state) => translations[state.currentLanguage] || translations.en,
    cvLink: (state) => (state.currentLanguage === 'it' ? '/docs/CV_it.pdf' : '/docs/CV_en.pdf'),
    cvFileName: (state) =>
      state.currentLanguage === 'it' ? 'Simone_Maccario_CV_it.pdf' : 'Simone_Maccario_CV_en.pdf',
  },

  actions: {
    initLanguage() {
      if (typeof window === 'undefined' || this.isInitialized) return
      this.isInitialized = true

      window.addEventListener('storage', (e) => {
        if (e.key === 'portfolio_language') {
          if (e.newValue === 'it' || e.newValue === 'en') {
            this.currentLanguage = e.newValue
            this.applyLanguage(false)
          }
        }
      })

      this.applyLanguage(false)
    },

    setLanguage(lang) {
      if (lang !== 'en' && lang !== 'it') return
      this.currentLanguage = lang
      this.applyLanguage(true)
    },

    toggleLanguage() {
      this.setLanguage(this.currentLanguage === 'en' ? 'it' : 'en')
    },

    applyLanguage(persist = true) {
      if (typeof window === 'undefined') return
      document.documentElement.lang = this.currentLanguage

      if (persist) {
        localStorage.setItem('portfolio_language', this.currentLanguage)
      }
    },
  },
})
