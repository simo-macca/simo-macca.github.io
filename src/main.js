import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import { useThemeStore } from '@/stores/ThemeStore.js'

const app = createApp(App)

app.use(createPinia())

// Configure custom spring-based animations
app.use(MotionPlugin, {
  directives: {
    'slide-up': {
      initial: { opacity: 0, y: 40 },
      visibleOnce: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
      },
    },
    'slide-down': {
      initial: { opacity: 0, y: -40 },
      enter: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
      },
    },
    'slide-left': {
      initial: { opacity: 0, x: -50 },
      visibleOnce: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
      },
    },
    'slide-right': {
      initial: { opacity: 0, x: 50 },
      visibleOnce: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 250, damping: 25, mass: 0.5 },
      },
    },
    'pop-in': {
      initial: { opacity: 0, scale: 0.8 },
      visibleOnce: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20, mass: 0.5 },
      },
    },
    'fade-in': {
      initial: { opacity: 0 },
      visibleOnce: { opacity: 1, transition: { duration: 600, easing: 'ease-out' } },
    },
  },
})

const themeStore = useThemeStore()
themeStore.applyTheme()

app.mount('#app')
