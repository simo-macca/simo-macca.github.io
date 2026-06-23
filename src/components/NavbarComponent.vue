<script setup>
import DarkModeComponent from '@/components/DarkModeComponent.vue'
import IconLogoPortfolio from '@/components/icons/IconLogoPortfolio.vue'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <nav class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <a href="#" class="flex shrink-0 items-center gap-2" v-motion-slide-down :delay="100">
        <IconLogoPortfolio />
        <span class="text-xl font-bold text-slate-900 dark:text-white">Simone Maccario</span>
      </a>
      <div
        class="hidden sm:flex sm:items-center sm:gap-6 lg:absolute lg:start-1/2 lg:top-1/2 lg:-translate-1/2"
      >
        <a
          v-for="(link, index) in navLinks"
          :key="link.href"
          :href="link.href"
          class="px-3 py-2 font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          v-motion-slide-down
          :delay="200 + index * 50"
        >
          {{ link.label }}
        </a>
      </div>
      <div>
        <DarkModeComponent v-motion-slide-down :delay="400" />
      </div>
    </div>
  </nav>
</template>
