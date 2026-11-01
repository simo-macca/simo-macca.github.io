<script setup>
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useLanguageStore } from '@/stores/LanguageStore.js'
import { FileDown } from '@lucide/vue'

const languageStore = useLanguageStore()

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
})

defineEmits(['close'])
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      id="mobile-nav-menu"
      class="border-b border-slate-200 bg-white/95 px-4 pt-2 pb-4 shadow-lg backdrop-blur-md sm:hidden dark:border-white/8 dark:bg-[#0B0F17]/95"
    >
      <div class="flex flex-col space-y-1">
        <!-- Language Switcher Row -->
        <div
          class="mb-1 flex items-center justify-between border-b border-slate-100 px-4 py-2 dark:border-white/6"
        >
          <span class="text-xs font-semibold text-slate-500 dark:text-[#9CA3AF]">
            {{ languageStore.currentLanguage === 'it' ? 'Lingua' : 'Language' }}
          </span>
          <LanguageSwitcher />
        </div>

        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="$emit('close')"
          class="rounded-lg px-4 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:bg-white/6 dark:hover:text-[#F3F4F6]"
        >
          {{ link.label }}
        </a>

        <div class="mt-1 border-t border-slate-100 pt-2 dark:border-white/6">
          <a
            :href="languageStore.cvLink"
            target="_blank"
            rel="noopener noreferrer"
            :download="languageStore.cvFileName"
            class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-base font-semibold text-sky-600 transition-colors hover:bg-slate-100 hover:text-sky-700 dark:text-sky-400 dark:hover:bg-white/6 dark:hover:text-sky-300"
            @click="$emit('close')"
          >
            <FileDown class="h-4 w-4" aria-hidden="true" />
            <span>{{
              languageStore.currentLanguage === 'it' ? 'Scarica CV (PDF)' : 'Download CV (PDF)'
            }}</span>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
