<script setup>
import { socialLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
</script>

<template>
  <ul class="flex items-center gap-1">
    <li v-for="link in socialLinks" :key="link.id">
      <a
        :href="link.href"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        :aria-label="
          link.external
            ? `${languageStore.t.a11y[link.ariaKey]} ${languageStore.t.a11y.opensInNewTab}`
            : languageStore.t.a11y[link.ariaKey]
        "
        :title="languageStore.t.a11y[link.ariaKey]"
        class="icon-button hover:-translate-y-0.5"
      >
        <component :is="link.icon" class="h-4.5 w-4.5" aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>
