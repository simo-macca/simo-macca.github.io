<script setup>
import { computed } from 'vue'
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
</script>

<template>
  <div
    class="relative inline-flex items-center rounded-xl border border-slate-200/80 bg-white/80 p-0.5 text-xs font-semibold shadow-2xs backdrop-blur-sm dark:border-white/8 dark:bg-night-900/80"
    role="group"
    :aria-label="t.label"
  >
    <!-- Sliding highlight behind the active language -->
    <span
      class="pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-lg bg-sky-600 shadow-xs transition-transform duration-300 ease-out dark:bg-sky-500"
      :class="languageStore.isItalian ? 'translate-x-full' : 'translate-x-0'"
      aria-hidden="true"
    />
    <button
      v-for="option in options"
      :key="option.code"
      type="button"
      class="relative z-10 min-w-9 rounded-lg px-2.5 py-1.5 focus-ring transition-colors duration-200"
      :class="
        languageStore.currentLanguage === option.code
          ? 'text-white'
          : 'text-slate-600 hover:text-slate-900 dark:text-mist-400 dark:hover:text-mist-100'
      "
      :lang="option.code"
      :aria-pressed="languageStore.currentLanguage === option.code"
      :aria-label="option.ariaLabel"
      @click="languageStore.setLanguage(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
