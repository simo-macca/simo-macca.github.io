<script setup>
import { ExternalLink } from '@lucide/vue'

const props = defineProps({
  methods: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div
    v-for="(method, index) in props.methods"
    :key="index"
    class="h-full min-w-0 rounded-lg bg-white p-6 inset-shadow-sm inset-shadow-sky-200 transition-all duration-300 hover:shadow-md hover:inset-shadow-sky-500 dark:bg-slate-800 dark:inset-shadow-sky-900 dark:hover:inset-shadow-sky-400"
    v-motion-slide-left
    :delay="index * 100"
  >
    <a
      :href="method.link"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex h-full items-start gap-4"
    >
      <component
        :is="method.icon"
        class="h-6 w-6 shrink-0 text-slate-600 transition-colors group-hover:text-sky-600 dark:text-slate-300 dark:group-hover:text-sky-400"
      />
      <div class="min-w-0 flex-1">
        <div class="mb-2 flex items-center gap-2">
          <h3
            class="line-clamp-1 font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400"
          >
            {{ method.title }}
          </h3>
          <ExternalLink
            class="h-4 w-4 text-slate-600 transition-colors group-hover:text-sky-600 dark:text-slate-300 dark:group-hover:text-sky-400"
          />
        </div>
        <p class="mb-1 truncate text-sm text-slate-600 dark:text-slate-300">{{ method.value }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">{{ method.description }}</p>
      </div>
    </a>
  </div>
</template>
