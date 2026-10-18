<script setup>
defineProps({
  topic: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
    validator: (arr) => arr.every((item) => typeof item === 'string'),
  },
  categoryIcon: {
    type: [Object, Function],
    default: null,
  },
})
</script>

<template>
  <div
    class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-sky-500/40 dark:hover:shadow-sky-950/30"
  >
    <div>
      <div class="mb-4 flex items-center justify-between">
        <h3
          class="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400"
        >
          {{ topic }}
        </h3>
        <component
          :is="categoryIcon"
          v-if="categoryIcon"
          class="h-5 w-5 text-slate-400 transition-colors group-hover:text-sky-500 dark:text-slate-500 dark:group-hover:text-sky-400"
          aria-hidden="true"
        />
      </div>

      <ul class="flex flex-wrap gap-2" role="list">
        <li
          v-for="skill in skills"
          :key="skill"
          class="inline-flex items-center rounded-lg border border-slate-200/60 bg-slate-100/80 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-150 group-hover:border-sky-200 group-hover:bg-sky-50/50 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-200 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-800"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>
