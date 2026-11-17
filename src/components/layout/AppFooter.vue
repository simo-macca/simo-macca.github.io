<script setup>
import { computed } from 'vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import SocialLinks from '@/components/common/SocialLinks.vue'
import { navLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t)
const currentYear = new Date().getFullYear()

const links = computed(() =>
  navLinks.map((link) => ({ id: link.id, href: `#${link.id}`, label: t.value.nav[link.labelKey] })),
)
</script>

<template>
  <footer class="mt-24 border-t border-slate-200/80 dark:border-white/7">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div class="max-w-sm">
          <a href="#home" class="inline-flex items-center gap-2 rounded-full focus-ring">
            <LogoIcon :animated="false" class="h-6 w-6 text-brand-600 dark:text-brand-300" />
            <span class="font-semibold tracking-tight text-slate-900 dark:text-mist-100">
              Simone Maccario
            </span>
          </a>
          <p class="mt-3 text-sm leading-relaxed">{{ t.footer.tagline }}</p>
        </div>

        <nav :aria-label="t.footer.navTitle">
          <h2 class="mb-4 eyebrow">{{ t.footer.navTitle }}</h2>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in links" :key="link.id">
              <a
                :href="link.href"
                class="rounded-sm text-slate-600 focus-ring transition-colors hover:text-slate-900 dark:text-mist-400 dark:hover:text-mist-100"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="mb-3 eyebrow">{{ t.footer.connectTitle }}</h2>
          <SocialLinks class="-ms-2.5" />
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-2 border-t border-slate-200/80 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-white/7"
      >
        <p>&copy; {{ currentYear }} Simone Maccario</p>
        <p>{{ t.footer.builtWith }}</p>
      </div>
    </div>
  </footer>
</template>
