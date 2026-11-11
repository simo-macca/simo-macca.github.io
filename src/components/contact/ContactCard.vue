<script setup>
import { ExternalLink } from '@lucide/vue'

/** One contact channel (already resolved to plain strings by the parent). */
defineProps({
  method: {
    type: Object,
    required: true,
  },
  newTabLabel: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <a
    :href="method.href"
    :target="method.external ? '_blank' : undefined"
    :rel="method.external ? 'noopener noreferrer' : undefined"
    class="group flex min-w-0 items-start gap-4 surface-card p-5 focus-ring transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-md dark:hover:border-sky-500/30"
    :aria-label="`${method.title}: ${method.value}${method.external ? ` ${newTabLabel}` : ''}`"
  >
    <span
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white dark:bg-night-800 dark:text-mist-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white"
      aria-hidden="true"
    >
      <component :is="method.icon" class="h-5 w-5" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="mb-1 flex items-center gap-1.5">
        <span
          class="text-sm font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-mist-100 dark:group-hover:text-sky-400"
        >
          {{ method.title }}
        </span>
        <ExternalLink
          v-if="method.external"
          class="h-3.5 w-3.5 text-slate-400 opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600 group-hover:opacity-100 dark:text-slate-500 dark:group-hover:text-sky-400"
          aria-hidden="true"
        />
      </span>
      <span class="block truncate text-sm font-medium text-slate-700 dark:text-mist-400">
        {{ method.value }}
      </span>
      <span class="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
        {{ method.description }}
      </span>
    </span>
  </a>
</template>
