<script setup>
import { ArrowUpRight } from '@lucide/vue'

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
    class="group flex min-w-0 surface-interactive items-center gap-4 surface-card rounded-2xl p-4 focus-ring"
    :aria-label="`${method.title}: ${method.value}${method.external ? ` ${newTabLabel}` : ''}`"
  >
    <span
      class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 transition duration-500 ease-out-expo group-hover:-rotate-6 group-hover:border-brand-300 group-hover:text-brand-600 dark:border-white/10 dark:bg-night-800 dark:text-mist-300 dark:group-hover:border-brand-400/40 dark:group-hover:text-brand-300"
      aria-hidden="true"
    >
      <component :is="method.icon" class="h-5 w-5" />
    </span>
    <span class="min-w-0 flex-1">
      <span class="block text-xs text-slate-500 dark:text-mist-400">{{ method.title }}</span>
      <span class="block truncate text-sm font-medium text-slate-900 dark:text-mist-100">
        {{ method.value }}
      </span>
    </span>
    <ArrowUpRight
      class="h-4 w-4 shrink-0 text-slate-400 transition duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-600 dark:text-mist-400 dark:group-hover:text-brand-300"
      aria-hidden="true"
    />
  </a>
</template>
