<script setup>
const props = defineProps({
  topic: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

//800px
const responsiveSpans = [
  // Cards 1 & 2: Half width on MD, 1/3 on LG
  'col-span-12 min-[601px]:col-span-6  min-[800px]:col-span-4',
  'col-span-12 min-[601px]:col-span-6  min-[800px]:col-span-4',
  // Card 3: Half width on MD (start of row 2), 1/3 on LG (end of row 1)
  'col-span-12 min-[601px]:col-span-6  min-[800px]:col-span-4',
  // Card 4: Half width on MD, but Half width on LG (start of row 2)
  'col-span-12 min-[601px]:col-span-6  min-[800px]:col-span-6',
  // Card 5: FULL width on MD, but Half width on LG (end of row 2)
  'col-span-12 min-[601px]:col-span-12 min-[800px]:col-span-6',
]
</script>

<template>
  <div
    :class="[
      responsiveSpans[props.index],
      'group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 inset-shadow-sm inset-shadow-slate-200 transition-all duration-300 hover:border-sky-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:inset-shadow-slate-900 dark:hover:border-sky-600 dark:hover:shadow-sky-900/20',
    ]"
  >
    <h3
      class="mb-4 text-xl font-bold text-sky-600 transition-colors group-hover:text-sky-500 dark:text-sky-400"
    >
      {{ props.topic }}
    </h3>
    <ul class="flex flex-wrap gap-2">
      <li
        v-for="skill in props.skills"
        :key="skill"
        class="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors group-hover:bg-sky-50 dark:bg-slate-700 dark:text-slate-200 dark:group-hover:bg-slate-600"
      >
        {{ skill }}
      </li>
    </ul>
  </div>
</template>
