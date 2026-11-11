<script setup>
/** Vertical education/experience timeline. Items come from `src/data/journey.js` (already localised). */
defineProps({
  items: {
    type: Array,
    required: true,
  },
  labels: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <ol class="relative space-y-5 border-s border-slate-200 ps-6 dark:border-white/10">
    <li v-for="item in items" :key="item.id" class="relative">
      <span
        class="absolute -inset-s-9.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border shadow-2xs"
        :class="
          item.type === 'experience'
            ? 'border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-500/30 dark:bg-indigo-950/60 dark:text-indigo-300'
            : 'border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-500/30 dark:bg-sky-950/60 dark:text-sky-300'
        "
        aria-hidden="true"
      >
        <component :is="item.icon" class="h-3.5 w-3.5" />
      </span>

      <p class="font-mono text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
        {{ item.period }}
        <span class="sr-only">
          · {{ item.type === 'experience' ? labels.experience : labels.education }}</span
        >
      </p>
      <h4 class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-mist-100">
        {{ item.title }}
      </h4>
      <p class="text-xs font-medium text-sky-700 dark:text-sky-400">{{ item.organization }}</p>
      <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-mist-400">
        {{ item.detail }}
      </p>
    </li>
  </ol>
</template>
