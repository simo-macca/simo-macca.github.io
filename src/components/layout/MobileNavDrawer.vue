<script setup>
import { ArrowUpRight, Download } from '@lucide/vue'
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
    enter-active-class="transition duration-400 ease-out-expo"
    enter-from-class="opacity-0 -translate-y-3 scale-98"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 -translate-y-2 scale-98"
  >
    <!-- Floating panel under the header pill: opening it never shifts the page content -->
    <div
      v-if="isOpen"
      id="mobile-nav-menu"
      class="absolute inset-x-0 top-full mt-2 max-h-[calc(100svh-6rem)] origin-top overflow-y-auto rounded-3xl border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-900/15 md:hidden dark:border-white/8 dark:bg-night-900"
    >
      <ul class="flex flex-col">
        <li v-for="(link, index) in links" :key="link.id">
          <a
            :href="link.href"
            class="group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium focus-ring transition-colors duration-200"
            :class="
              activeId === link.id
                ? 'bg-slate-900/5 text-slate-900 dark:bg-white/8 dark:text-mist-100'
                : 'text-slate-600 hover:bg-slate-900/4 hover:text-slate-900 dark:text-mist-400 dark:hover:bg-white/5 dark:hover:text-mist-100'
            "
            :aria-current="activeId === link.id ? 'location' : undefined"
            @click="$emit('close')"
          >
            <span class="flex items-baseline gap-3">
              <span class="font-mono text-xs text-slate-400 dark:text-mist-400" aria-hidden="true">
                0{{ index + 1 }}
              </span>
              {{ link.label }}
            </span>
            <ArrowUpRight
              class="h-4 w-4 opacity-40 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              aria-hidden="true"
            />
          </a>
        </li>
      </ul>

      <div
        class="mt-2 flex items-center justify-between gap-3 border-t border-slate-200/80 px-2 pt-3 pb-1 dark:border-white/8"
      >
        <a
          :href="languageStore.cv.href"
          :download="languageStore.cv.fileName"
          class="btn-primary h-10 px-4 text-sm"
          @click="$emit('close')"
        >
          <Download class="h-4 w-4" aria-hidden="true" />
          <span>{{ languageStore.t.nav.cvLong }}</span>
        </a>
        <LanguageSwitcher />
      </div>
    </div>
  </Transition>
</template>
