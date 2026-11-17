<script setup>
/**
 * Vertical education/experience timeline. Items come from `src/data/journey.js`
 * (already localised). The first item is the current one and gets a live dot.
 */
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
  <ol class="relative">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      v-reveal="index * 120"
      class="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-7 last:pb-0"
    >
      <!-- Connector line to the next item -->
      <span
        v-if="index < items.length - 1"
        class="absolute top-10 bottom-1 left-4.25 w-px bg-linear-to-b from-slate-300 to-slate-200/0 dark:from-white/15 dark:to-white/0"
        aria-hidden="true"
      />

      <span
        class="relative flex h-9 w-9 items-center justify-center rounded-xl border"
        :class="
          item.type === 'experience'
            ? 'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-300'
            : 'border-brand-200 bg-brand-50 text-brand-600 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-300'
        "
        aria-hidden="true"
      >
        <component :is="item.icon" class="h-4 w-4" />
        <span v-if="index === 0" class="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden"
          />
          <span
            class="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-night-900"
          />
        </span>
      </span>

      <div class="min-w-0">
        <p class="font-mono text-2xs tracking-wide text-slate-400 dark:text-mist-400">
          {{ item.period }}
          <span class="sr-only">
            · {{ item.type === 'experience' ? labels.experience : labels.education }}</span
          >
        </p>
        <h4 class="mt-0.5 text-base font-semibold tracking-tight text-slate-900 dark:text-mist-100">
          {{ item.title }}
        </h4>
        <p class="text-sm text-slate-600 dark:text-mist-300">{{ item.organization }}</p>
        <p class="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-mist-400">
          {{ item.detail }}
        </p>
      </div>
    </li>
  </ol>
</template>
