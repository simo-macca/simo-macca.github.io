import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false

    return {
      isDark: stored ? stored === 'dark' : prefersDark,
      hasStoredPreference: Boolean(stored),
      isInitialized: false,
    }
  },

  actions: {
    initTheme() {
      if (typeof window === 'undefined' || this.isInitialized) return
      this.isInitialized = true

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = (e) => {
        if (!localStorage.getItem('theme')) {
          this.isDark = e.matches
          this.applyTheme(false)
        }
      }

      mediaQuery.addEventListener('change', handleSystemThemeChange)

      window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
          if (e.newValue === 'dark') {
            this.isDark = true
            this.hasStoredPreference = true
          } else if (e.newValue === 'light') {
            this.isDark = false
            this.hasStoredPreference = true
          } else {
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            this.hasStoredPreference = false
          }
          this.applyTheme(false)
        }
      })

      this.applyTheme(false)
    },

    applyTheme(persist = true) {
      if (typeof window === 'undefined') return
      const html = document.documentElement
      const meta = document.querySelector('meta[name="color-scheme"]')

      if (this.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }

      if (persist) {
        const themeValue = this.isDark ? 'dark' : 'light'
        localStorage.setItem('theme', themeValue)
        this.hasStoredPreference = true
        if (meta) meta.content = themeValue
      } else {
        const stored = localStorage.getItem('theme')
        if (meta) meta.content = stored || 'light dark'
      }
    },

    toggle() {
      this.isDark = !this.isDark
      this.applyTheme(true)
    },
  },
})
