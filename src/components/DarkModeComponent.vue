<script setup>
import { useThemeStore } from '@/stores/ThemeStore.js'
import { Sun, Moon } from '@lucide/vue'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    @click="theme.toggle()"
    class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
    :aria-label="theme.isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="theme.isDark ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <Sun
      v-if="theme.isDark"
      class="h-5 w-5 text-amber-400 transition-transform duration-300 hover:rotate-45"
    />
    <Moon
      v-else
      class="h-5 w-5 text-slate-700 transition-transform duration-300 hover:-rotate-12 dark:text-slate-200"
    />
  </button>
</template>
