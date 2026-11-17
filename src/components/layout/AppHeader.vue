<script setup>
import { computed, ref, watch } from 'vue'
import { onKeyStroke, useMediaQuery, useWindowScroll } from '@vueuse/core'
import { Download, Menu, X } from '@lucide/vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import MobileNavDrawer from '@/components/layout/MobileNavDrawer.vue'
import { useActiveSection } from '@/composables/useActiveSection.js'
import { useSlidingIndicator } from '@/composables/useSlidingIndicator.js'
import { navLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t)

const links = computed(() =>
  navLinks.map((link) => ({ ...link, href: `#${link.id}`, label: t.value.nav[link.labelKey] })),
)

// 'home' is observed too, so no link is highlighted while the hero is in view.
const { activeId } = useActiveSection(['home', ...navLinks.map((link) => link.id)])

const linkList = ref(null)
const hoveredId = ref(null)
// The pill follows the hovered link and settles back on the active section.
const { style: indicatorStyle } = useSlidingIndicator(
  linkList,
  () => hoveredId.value ?? activeId.value,
)

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 12)

const isMobileMenuOpen = ref(false)
const isDesktop = useMediaQuery('(min-width: 768px)')

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close the drawer with Escape or when the viewport grows to the desktop layout.
onKeyStroke('Escape', closeMobileMenu)
watch(isDesktop, (desktop) => desktop && closeMobileMenu())
</script>

<template>
  <header class="sticky top-0 z-50 w-full px-3 pt-3 sm:px-6 sm:pt-4">
    <nav
      class="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border pr-2 pl-4 transition duration-500 ease-out-expo sm:pl-5"
      :class="
        isScrolled || isMobileMenuOpen
          ? 'border-slate-200/80 bg-white/75 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/8 dark:bg-night-900/70 dark:shadow-black/40'
          : 'border-transparent bg-transparent'
      "
      :aria-label="t.a11y.mainNav"
    >
      <!-- Brand -->
      <a
        href="#home"
        class="group flex shrink-0 items-center gap-2 rounded-full focus-ring"
        :aria-label="t.a11y.homeLink"
      >
        <LogoIcon class="h-7 w-7 text-brand-600 dark:text-brand-300" />
        <span class="text-base font-semibold tracking-tight text-slate-900 dark:text-mist-100">
          Simone Maccario
        </span>
      </a>

      <!-- Desktop links with a gliding indicator -->
      <ul
        ref="linkList"
        class="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex"
        @pointerleave="hoveredId = null"
      >
        <li
          class="pointer-events-none absolute top-0 left-0 rounded-full bg-slate-900/6 duration-500 ease-out-expo dark:bg-white/8"
          :style="indicatorStyle"
          role="presentation"
          aria-hidden="true"
        />
        <li v-for="link in links" :key="link.id">
          <a
            :href="link.href"
            :data-indicator-key="link.id"
            class="relative block rounded-full px-4 py-2 text-sm font-medium focus-ring transition-colors duration-300"
            :class="
              activeId === link.id
                ? 'text-slate-900 dark:text-mist-100'
                : 'text-slate-500 hover:text-slate-900 dark:text-mist-400 dark:hover:text-mist-100'
            "
            :aria-current="activeId === link.id ? 'location' : undefined"
            @pointerenter="hoveredId = link.id"
            @focus="hoveredId = link.id"
            @blur="hoveredId = null"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <div class="hidden md:block">
          <LanguageSwitcher />
        </div>

        <ThemeToggle />

        <a
          :href="languageStore.cv.href"
          :download="languageStore.cv.fileName"
          class="group btn-primary ms-1 hidden h-9 px-4 text-sm md:inline-flex"
          :aria-label="t.about.cvAriaLabel"
        >
          <Download
            class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
            aria-hidden="true"
          />
          <span>{{ t.nav.cv }}</span>
        </a>

        <button
          type="button"
          class="icon-button md:hidden"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-menu"
          :aria-label="isMobileMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 rotate-90 scale-75"
            leave-active-class="transition duration-150 ease-in"
            leave-to-class="opacity-0 -rotate-90 scale-75"
          >
            <X v-if="isMobileMenuOpen" key="close" class="h-5 w-5" aria-hidden="true" />
            <Menu v-else key="open" class="h-5 w-5" aria-hidden="true" />
          </Transition>
        </button>
      </div>

      <MobileNavDrawer
        :is-open="isMobileMenuOpen"
        :links="links"
        :active-id="activeId"
        @close="closeMobileMenu"
      />
    </nav>
  </header>
</template>
