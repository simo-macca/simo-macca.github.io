<script setup>
import { ArrowUp } from '@lucide/vue'
import { useScrollProgress } from '@/composables/useScrollProgress.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const { isPastThreshold } = useScrollProgress(700)

const scrollToTop = () => {
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-4 scale-90"
  >
    <button
      v-if="isPastThreshold"
      type="button"
      class="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 icon-button h-11 w-11 shadow-lg sm:right-6 sm:bottom-6"
      :aria-label="languageStore.t.a11y.backToTop"
      :title="languageStore.t.a11y.backToTop"
      @click="scrollToTop"
    >
      <ArrowUp class="h-5 w-5" aria-hidden="true" />
    </button>
  </Transition>
</template>
