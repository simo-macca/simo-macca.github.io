<script setup>
import { useThemeStore } from '@/stores/ThemeStore.js'
import { Sun, Moon } from '@lucide/vue'

const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    @click="theme.toggle()"
    class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-xs backdrop-blur-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 dark:border-white/[0.08] dark:bg-[#111827]/80 dark:text-[#9CA3AF] dark:hover:border-white/[0.16] dark:hover:bg-[#1F2937] dark:hover:text-[#F3F4F6]"
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
