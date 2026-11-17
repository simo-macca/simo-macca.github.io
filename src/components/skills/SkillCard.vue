<script setup>
import { useSpotlight } from '@/composables/useSpotlight.js'

/** One skill category: icon, title, description and technology chips. */
defineProps({
  index: {
    type: Number,
    default: null,
  },
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
    class="group spotlight flex h-full surface-interactive flex-col surface-card p-6 sm:p-7"
    @pointermove="onPointerMove"
  >
    <div class="mb-5 flex items-start justify-between gap-4">
      <span
        v-if="icon"
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white text-slate-700 shadow-xs transition duration-500 ease-out-expo group-hover:-rotate-6 group-hover:border-brand-300 group-hover:text-brand-600 dark:border-white/10 dark:bg-night-800 dark:text-mist-300 dark:group-hover:border-brand-400/40 dark:group-hover:text-brand-300"
        aria-hidden="true"
      >
        <component :is="icon" class="h-5 w-5" />
      </span>
      <span
        v-if="index !== null"
        class="font-mono text-xs text-slate-300 dark:text-white/20"
        aria-hidden="true"
      >
        {{ String(index).padStart(2, '0') }}
      </span>
    </div>

    <h3 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-mist-100">
      {{ topic }}
    </h3>
    <p
      v-if="description"
      class="mt-2 mb-6 text-sm leading-relaxed text-slate-500 dark:text-mist-400"
    >
      {{ description }}
    </p>

    <ul class="mt-auto flex flex-wrap gap-1.5">
      <li
        v-for="(skill, index) in skills"
        :key="skill"
        class="chip px-3 py-1 text-xs transition-colors duration-300 group-hover:border-brand-200 dark:group-hover:border-brand-400/25"
        :style="{ transitionDelay: `${index * 30}ms` }"
      >
        {{ skill }}
      </li>
    </ul>
  </article>
</template>
