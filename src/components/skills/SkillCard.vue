<script setup>
import { useSpotlight } from '@/composables/useSpotlight.js'

/** One skill category: icon, title, description and technology chips. */
defineProps({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  skills: {
    type: Array,
    required: true,
    validator: (items) => items.every((item) => typeof item === 'string'),
  },
  icon: {
    type: [Object, Function],
    default: null,
  },
})

const { onPointerMove } = useSpotlight()
</script>

<template>
  <article
    class="group spotlight flex h-full flex-col surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-lg dark:hover:border-sky-500/30 dark:hover:shadow-sky-950/20"
    @pointermove="onPointerMove"
  >
    <div class="mb-3 flex items-center gap-3">
      <span
        v-if="icon"
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:rotate-6 group-hover:bg-sky-600 group-hover:text-white dark:bg-night-800 dark:text-slate-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white"
      >
        <component :is="icon" class="h-5 w-5" aria-hidden="true" />
      </span>
      <h3
        class="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-mist-100 dark:group-hover:text-sky-400"
      >
        {{ topic }}
      </h3>
    </div>

    <p v-if="description" class="mb-4 text-sm leading-relaxed text-slate-500 dark:text-mist-400">
      {{ description }}
    </p>

    <ul class="mt-auto flex flex-wrap gap-2">
      <li
        v-for="(skill, index) in skills"
        :key="skill"
        class="inline-flex items-center rounded-lg border border-slate-200/70 bg-slate-100/80 px-2.5 py-1 font-mono text-xs font-medium text-slate-700 transition-colors duration-200 group-hover:border-sky-200 group-hover:bg-sky-50/60 dark:border-white/6 dark:bg-night-800/90 dark:text-mist-100 dark:group-hover:border-sky-500/30"
        :style="{ transitionDelay: `${index * 25}ms` }"
      >
        {{ skill }}
      </li>
    </ul>
  </article>
</template>
