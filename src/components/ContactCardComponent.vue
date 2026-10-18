<script setup>
import { ExternalLink } from '@lucide/vue'

defineProps({
  method: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="h-full min-w-0 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-sky-500/40"
  >
    <a
      :href="method.link"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-full items-start gap-4 rounded-xl focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
      :aria-label="`${method.title}: ${method.value}`"
    >
      <div
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors duration-200 group-hover:bg-sky-50 group-hover:text-sky-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-sky-950/50 dark:group-hover:text-sky-400"
      >
        <component :is="method.icon" class="h-5 w-5" aria-hidden="true" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="mb-1 flex items-center gap-1.5">
          <h3
            class="text-sm font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400"
          >
            {{ method.title }}
          </h3>
          <ExternalLink
            class="h-3.5 w-3.5 text-slate-400 opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-sky-600 group-hover:opacity-100 dark:text-slate-500 dark:group-hover:text-sky-400"
            aria-hidden="true"
          />
        </div>
        <p class="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
          {{ method.value }}
        </p>
        <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {{ method.description }}
        </p>
      </div>
    </a>
  </div>
</template>
