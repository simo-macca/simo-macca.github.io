<script setup>
import { FileDown } from '@lucide/vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { useLanguageStore } from '@/stores/language.js'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
  activeId: {
    type: String,
    default: null,
  },
})

defineEmits(['close'])

const languageStore = useLanguageStore()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <!-- Overlay below the sticky header: opening it never shifts the page content -->
    <div
      v-if="isOpen"
      id="mobile-nav-menu"
      class="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-slate-200/80 bg-white/95 px-4 pb-4 shadow-lg backdrop-blur-md sm:hidden dark:border-white/8 dark:bg-night-950/95"
    >
      <ul class="flex flex-col gap-1 border-t border-slate-200/80 pt-3 dark:border-white/8">
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="link.href"
            class="flex items-center rounded-lg px-4 py-3 text-base font-medium focus-ring transition-colors"
            :class="
              activeId === link.id
                ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-mist-400 dark:hover:bg-white/6 dark:hover:text-mist-100'
            "
            :style="{ transitionDelay: `${index * 30}ms` }"
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="$emit('close')"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div
        class="mt-3 flex items-center justify-between gap-3 border-t border-slate-200/80 px-4 pt-3 dark:border-white/8"
      >
        <a
          :href="languageStore.cv.href"
          :download="languageStore.cv.fileName"
          class="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-sky-600 focus-ring transition-colors hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
          @click="$emit('close')"
        >
          <FileDown class="h-4 w-4" aria-hidden="true" />
          <span>{{ languageStore.t.nav.cvLong }}</span>
        </a>
        <LanguageSwitcher />
      </div>
    </div>
  </Transition>
</template>
