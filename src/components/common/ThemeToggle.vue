<script setup>
import { computed } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { withViewTransition } from '@/composables/useViewTransition.js'
import { useLanguageStore } from '@/stores/language.js'
import { useThemeStore } from '@/stores/theme.js'

const theme = useThemeStore()
const languageStore = useLanguageStore()

const label = computed(() =>
  theme.isDark ? languageStore.t.a11y.themeToLight : languageStore.t.a11y.themeToDark,
)

/** The new theme spreads as a circle from the button (View Transitions API). */
function onToggle(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  withViewTransition(() => theme.toggle(), {
    type: 'circle',
    origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
  })
}
</script>

<template>
  <button
    type="button"
    class="icon-button overflow-hidden"
    :aria-label="label"
    :title="label"
    @click="onToggle"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-300 ease-out-expo"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -rotate-90 scale-50"
    >
      <Sun v-if="theme.isDark" key="sun" class="h-4.5 w-4.5" aria-hidden="true" />
      <Moon v-else key="moon" class="h-4.5 w-4.5" aria-hidden="true" />
    </Transition>
  </button>
</template>
