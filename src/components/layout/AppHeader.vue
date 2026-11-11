<script setup>
import { computed, ref, watch } from 'vue'
import { onKeyStroke, useMediaQuery } from '@vueuse/core'
import { FileDown, Menu, X } from '@lucide/vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import MobileNavDrawer from '@/components/layout/MobileNavDrawer.vue'
import { useActiveSection } from '@/composables/useActiveSection.js'
import { useScrollProgress } from '@/composables/useScrollProgress.js'
import { navLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t)

const links = computed(() =>
  navLinks.map((link) => ({ ...link, href: `#${link.id}`, label: t.value.nav[link.labelKey] })),
)

// 'home' is observed too, so no link is highlighted while the hero is in view.
const { activeId } = useActiveSection(['home', ...navLinks.map((link) => link.id)])
const { progress } = useScrollProgress()

const isMobileMenuOpen = ref(false)
const isDesktop = useMediaQuery('(min-width: 640px)')

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close the drawer with Escape or when the viewport grows to the desktop layout.
onKeyStroke('Escape', closeMobileMenu)
watch(isDesktop, (desktop) => desktop && closeMobileMenu())
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md transition-colors duration-300 dark:border-white/8 dark:bg-night-950/85"
  >
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" :aria-label="t.a11y.mainNav">
      <div class="relative flex h-16 items-center justify-between gap-3">
        <!-- Brand -->
        <a
          href="#home"
          class="group flex shrink-0 items-center gap-2.5 rounded-lg focus-ring"
          :aria-label="t.a11y.homeLink"
          v-motion-slide-down
          :delay="100"
        >
          <LogoIcon
            class="h-8 w-8 text-sky-500 transition-transform duration-300 group-hover:scale-110 dark:text-sky-400"
          />
          <span
            class="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-mist-100"
          >
            Simone Maccario
          </span>
        </a>

        <!-- Desktop links with active-section indicator -->
        <ul
          class="hidden sm:flex sm:items-center sm:gap-1 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
        >
          <li
            v-for="(link, index) in links"
            :key="link.id"
            v-motion-slide-down
            :delay="200 + index * 50"
          >
            <a
              :href="link.href"
              class="relative block rounded-lg px-3 py-2 text-sm font-medium focus-ring transition-colors duration-200 md:px-3.5"
              :class="
                activeId === link.id
                  ? 'text-sky-700 dark:text-sky-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-mist-400 dark:hover:bg-white/6 dark:hover:text-mist-100'
              "
              :aria-current="activeId === link.id ? 'location' : undefined"
            >
              {{ link.label }}
              <span
                class="absolute inset-x-3 -bottom-px h-0.5 origin-center rounded-full bg-sky-500 transition-transform duration-300"
                :class="activeId === link.id ? 'scale-x-100' : 'scale-x-0'"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <a
            :href="languageStore.cv.href"
            :download="languageStore.cv.fileName"
            class="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/80 px-3 text-xs font-semibold text-slate-700 shadow-2xs focus-ring backdrop-blur-sm transition-colors hover:border-sky-400/50 hover:text-sky-600 sm:inline-flex dark:border-white/8 dark:bg-night-900/80 dark:text-mist-400 dark:hover:border-white/16 dark:hover:text-mist-100"
            :aria-label="t.about.cvAriaLabel"
            v-motion-slide-down
            :delay="350"
          >
            <FileDown class="h-3.5 w-3.5 text-sky-500 dark:text-sky-400" aria-hidden="true" />
            <span>{{ t.nav.cv }}</span>
          </a>

          <div class="hidden sm:block" v-motion-slide-down :delay="380">
            <LanguageSwitcher />
          </div>

          <ThemeToggle v-motion-slide-down :delay="400" />

          <button
            type="button"
            class="icon-button sm:hidden"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-nav-menu"
            :aria-label="isMobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <X v-if="isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
            <Menu v-else class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNavDrawer
        :is-open="isMobileMenuOpen"
        :links="links"
        :active-id="activeId"
        @close="closeMobileMenu"
      />
    </nav>

    <!-- Reading progress -->
    <div
      class="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r from-sky-400 via-indigo-500 to-cyan-400"
      :style="{ transform: `scaleX(${progress})` }"
      aria-hidden="true"
    />
  </header>
</template>
