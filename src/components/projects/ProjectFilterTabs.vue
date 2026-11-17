<script setup>
import { ref } from 'vue'
import { useSlidingIndicator } from '@/composables/useSlidingIndicator.js'

/**
 * Category filter rendered as a segmented control of toggle buttons
 * (`aria-pressed`). A single pill glides to the active option, and each option
 * shows how many projects it contains.
 */
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const model = defineModel({ type: String, required: true })

const container = ref(null)
const { style: indicatorStyle } = useSlidingIndicator(container, () =>
  props.options.some((option) => option.id === model.value) ? model.value : null,
)
</script>

<template>
  <!-- Scrolls horizontally on very narrow screens instead of wrapping -->
  <div class="-mx-4 scrollbar-none overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
    <div
      ref="container"
      class="relative inline-flex items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/60 p-1 backdrop-blur-xl dark:border-white/8 dark:bg-white/3"
      role="group"
      :aria-label="label"
    >
      <span
        class="pointer-events-none absolute top-0 left-0 rounded-full bg-slate-900 shadow-sm duration-500 ease-out-expo dark:bg-white"
        :style="indicatorStyle"
        aria-hidden="true"
      />
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        :data-indicator-key="option.id"
        class="relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap focus-ring transition-colors duration-300"
        :class="
          model === option.id
            ? 'text-white dark:text-night-950'
            : 'text-slate-500 hover:text-slate-900 dark:text-mist-400 dark:hover:text-mist-100'
        "
        :aria-pressed="model === option.id"
        @click="model = option.id"
      >
        {{ option.label }}
        <span
          class="font-mono text-2xs tabular-nums transition-opacity duration-300"
          :class="model === option.id ? 'opacity-70' : 'opacity-50'"
          aria-hidden="true"
        >
          {{ option.count }}
        </span>
      </button>
    </div>
  </div>
</template>
