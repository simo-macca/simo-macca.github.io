<script setup>
import { useThemeStore } from '@/stores/ThemeStore.js'

const theme = useThemeStore()
</script>

<template>
  <button
    @click="theme.toggle()"
    class="rounded-full p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
    aria-label="Toggle dark mode"
  >
    <!-- Sun Icon (for Dark Mode) -->
    <svg
      v-if="theme.isDark"
      class="h-6 w-6 text-sky-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <!-- Moon Icon (for Light Mode) -->
    <svg
      v-else
      class="h-6 w-6 text-sky-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  </button>
</template>
