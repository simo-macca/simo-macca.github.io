<script setup>
import { useLanguageStore } from '@/stores/LanguageStore.js'

const languageStore = useLanguageStore()
</script>

<template>
  <div
    class="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/80 p-0.5 text-xs font-semibold shadow-2xs backdrop-blur-sm dark:border-white/8 dark:bg-[#111827]/80"
    role="group"
    :aria-label="languageStore.t.languageSwitcher.label"
  >
    <button
      type="button"
      @click="languageStore.setLanguage('en')"
      class="rounded-lg px-2.5 py-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
      :class="[
        languageStore.isEnglish
          ? 'bg-sky-600 text-white shadow-xs dark:bg-sky-500'
          : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]',
      ]"
      :aria-pressed="languageStore.isEnglish"
      :aria-label="languageStore.t.languageSwitcher.enLabel"
    >
      EN
    </button>
    <button
      type="button"
      @click="languageStore.setLanguage('it')"
      class="rounded-lg px-2.5 py-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
      :class="[
        languageStore.isItalian
          ? 'bg-sky-600 text-white shadow-xs dark:bg-sky-500'
          : 'text-slate-600 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]',
      ]"
      :aria-pressed="languageStore.isItalian"
      :aria-label="languageStore.t.languageSwitcher.itLabel"
    >
      IT
    </button>
  </div>
</template>
