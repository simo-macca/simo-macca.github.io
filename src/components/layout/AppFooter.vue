<script setup>
import LogoIcon from '@/components/icons/LogoIcon.vue'
import SocialLinks from '@/components/common/SocialLinks.vue'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-24 border-t border-slate-200/80 dark:border-white/8">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8"
    >
      <p
        class="flex items-center gap-2 text-center text-sm text-slate-600 dark:text-mist-400"
        v-motion-slide-up
        :delay="100"
      >
        <LogoIcon :animated="false" class="h-4 w-4 text-sky-500 dark:text-sky-400" />
        <span
          >&copy; {{ currentYear }} Simone Maccario. {{ languageStore.t.footer.builtWith }}</span
        >
      </p>
      <SocialLinks />
    </div>
  </footer>
</template>
