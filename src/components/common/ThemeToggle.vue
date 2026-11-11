<script setup>
import { computed } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { useLanguageStore } from '@/stores/language.js'
import { useThemeStore } from '@/stores/theme.js'

const theme = useThemeStore()
const languageStore = useLanguageStore()

const label = computed(() =>
  theme.isDark ? languageStore.t.a11y.themeToLight : languageStore.t.a11y.themeToDark,
)
</script>

<template>
  <button
    type="button"
    class="relative icon-button overflow-hidden"
    :aria-label="label"
    :title="label"
    @click="theme.toggle()"
  >
    <!-- Icons cross-fade and rotate in/out when the theme changes -->
    <Transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -rotate-90 scale-50"
    >
      <Sun v-if="theme.isDark" key="sun" class="h-5 w-5 text-amber-400" aria-hidden="true" />
      <Moon v-else key="moon" class="h-5 w-5 text-slate-700" aria-hidden="true" />
    </Transition>
  </button>
</template>
