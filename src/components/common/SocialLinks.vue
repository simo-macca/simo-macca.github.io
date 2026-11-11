<script setup>
import { socialLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
</script>

<template>
  <ul class="flex items-center gap-2">
    <li
      v-for="(link, index) in socialLinks"
      :key="link.id"
      v-motion-slide-up
      :delay="200 + index * 100"
    >
      <a
        :href="link.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${languageStore.t.a11y[link.ariaKey]} ${languageStore.t.a11y.opensInNewTab}`"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 focus-ring transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-white/6 dark:hover:text-sky-400"
      >
        <component :is="link.icon" class="h-5 w-5" />
      </a>
    </li>
  </ul>
</template>
