<script setup>
import { computed } from 'vue'
import { withViewTransition } from '@/composables/useViewTransition.js'
import { SUPPORTED_LANGUAGES } from '@/i18n/index.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.languageSwitcher)

const options = computed(() =>
  SUPPORTED_LANGUAGES.map((code) => ({
    code,
    label: code.toUpperCase(),
    ariaLabel: code === 'it' ? t.value.itLabel : t.value.enLabel,
  })),
)

const activeIndex = computed(() => SUPPORTED_LANGUAGES.indexOf(languageStore.currentLanguage))

/** Cross-fades the page so the text swap does not flash. */
function select(code) {
  if (code === languageStore.currentLanguage) return
  withViewTransition(() => languageStore.setLanguage(code), { type: 'fade' })
}
</script>

<template>
  <div
    class="relative inline-grid auto-cols-fr grid-flow-col items-center rounded-full border border-slate-200/80 bg-white/60 p-0.5 font-mono text-2xs font-medium dark:border-white/8 dark:bg-white/4"
    role="group"
    :aria-label="t.label"
  >
    <!-- Sliding highlight behind the active language -->
    <span
      class="pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-slate-900 shadow-sm transition-transform duration-500 ease-out-expo dark:bg-white"
      :style="{
        width: `calc((100% - 4px) / ${options.length})`,
        transform: `translateX(${activeIndex * 100}%)`,
      }"
      aria-hidden="true"
    />
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="relative z-10 min-w-9 rounded-full px-2.5 py-1.5 focus-ring transition-colors duration-300"
      :class="
        languageStore.currentLanguage === option.code
          ? 'text-white dark:text-night-950'
          : 'text-slate-500 hover:text-slate-900 dark:text-mist-400 dark:hover:text-mist-100'
      "
      :lang="option.code"
      :aria-pressed="languageStore.currentLanguage === option.code"
      :aria-label="option.ariaLabel"
      @click="select(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
