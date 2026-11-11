import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { installMotion } from '@/plugins/motion.js'
import { useLanguageStore } from '@/stores/language.js'
import { useThemeStore } from '@/stores/theme.js'

const app = createApp(App)

app.use(createPinia())
installMotion(app)

// Apply theme and language before mounting so the first render is already correct.
useThemeStore().initTheme()
useLanguageStore().initLanguage()

app.mount('#app')
