<script setup>
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
    class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-lg dark:border-white/8 dark:bg-[#111827]/80 dark:hover:border-sky-500/30 dark:hover:shadow-sky-950/20"
  >
    <div>
      <div class="mb-2 flex items-center justify-between">
        <h3
          class="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-[#F3F4F6] dark:group-hover:text-sky-400"
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

      <p v-if="description" class="mb-4 text-xs leading-relaxed text-slate-500 dark:text-[#9CA3AF]">
        {{ description }}
      </p>

      <ul class="flex flex-wrap gap-2" role="list">
        <li
          v-for="skill in skills"
          :key="skill"
          class="inline-flex items-center rounded-lg border border-slate-200/70 bg-slate-100/80 px-2.5 py-1 font-mono text-xs font-medium text-slate-700 transition-colors duration-150 group-hover:border-sky-200 group-hover:bg-sky-50/50 dark:border-white/6 dark:bg-[#1F2937]/90 dark:text-[#F3F4F6] dark:group-hover:border-sky-500/30 dark:group-hover:bg-[#1F2937]"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </div>
</template>
