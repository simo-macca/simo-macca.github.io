<script setup>
import { ref } from 'vue'
import DarkModeComponent from '@/components/DarkModeComponent.vue'
import IconLogoPortfolio from '@/components/icons/IconLogoPortfolio.vue'
import { Menu, X } from '@lucide/vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
    <div class="relative flex h-16 items-center justify-between">
      <!-- Brand Logo & Name -->
      <a
        href="#"
        class="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
        aria-label="Simone Maccario portfolio homepage"
        v-motion-slide-down
        :delay="100"
      >
        <IconLogoPortfolio
          class="h-9 w-9 text-sky-500 transition-transform duration-300 hover:scale-105"
        />
        <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Simone Maccario
        </span>
      </a>

      <!-- Desktop Navigation Links -->
      <div
        class="hidden sm:flex sm:items-center sm:gap-1 md:gap-2 lg:absolute lg:start-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
      >
        <a
          v-for="(link, index) in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
          v-motion-slide-down
          :delay="200 + index * 50"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Action Items: Dark Mode & Mobile Menu Button -->
      <div class="flex items-center gap-2">
        <DarkModeComponent v-motion-slide-down :delay="400" />

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          @click="toggleMobileMenu"
          class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none sm:hidden dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
        >
          <X v-if="isMobileMenuOpen" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-menu"
        class="border-b border-slate-200 bg-slate-50/95 px-4 pt-2 pb-4 shadow-lg backdrop-blur-md sm:hidden dark:border-slate-800 dark:bg-slate-900/95"
      >
        <div class="flex flex-col space-y-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="closeMobileMenu"
            class="rounded-lg px-4 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>
