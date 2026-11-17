<script setup>
import { computed } from 'vue'
import { ArrowUp } from '@lucide/vue'
import { useScrollProgress } from '@/composables/useScrollProgress.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const { progress, isPastThreshold } = useScrollProgress(700)

// The ring around the button doubles as a reading-progress indicator.
const RADIUS = 21
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const dashOffset = computed(() => CIRCUMFERENCE * (1 - progress.value))

const scrollToTop = () => {
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out-expo"
    enter-from-class="opacity-0 translate-y-4 scale-75"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-4 scale-75"
  >
    <button
      v-if="isPastThreshold"
      type="button"
      class="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 shadow-lg focus-ring backdrop-blur-xl transition duration-300 hover:text-brand-600 active:scale-90 sm:right-6 sm:bottom-6 dark:border-white/8 dark:bg-night-900/80 dark:text-mist-300 dark:hover:text-brand-300"
      :aria-label="languageStore.t.a11y.backToTop"
      :title="languageStore.t.a11y.backToTop"
      @click="scrollToTop"
    >
      <svg class="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24"
          cy="24"
          :r="RADIUS"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          class="text-brand-500 dark:text-brand-400"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <ArrowUp
        class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </button>
  </Transition>
</template>
