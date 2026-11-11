<script setup>
/**
 * Category filter rendered as a group of toggle buttons (`aria-pressed`).
 * Each option shows how many projects it contains.
 */
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2" role="group" :aria-label="label">
    <button
      v-for="option in options"
      :key="option.id"
      type="button"
      class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide focus-ring transition-all duration-200 active:scale-95"
      :class="
        modelValue === option.id
          ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20 dark:bg-sky-500'
          : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-white/8 dark:bg-night-900/80 dark:text-mist-400 dark:hover:border-white/16 dark:hover:bg-night-800 dark:hover:text-mist-100'
      "
      :aria-pressed="modelValue === option.id"
      @click="$emit('update:modelValue', option.id)"
    >
      {{ option.label }}
      <span
        class="rounded-md px-1.5 py-0.5 font-mono text-[10px] leading-none"
        :class="
          modelValue === option.id
            ? 'bg-white/20 text-white'
            : 'bg-slate-100 text-slate-500 dark:bg-white/6 dark:text-slate-400'
        "
        aria-hidden="true"
      >
        {{ option.count }}
      </span>
    </button>
  </div>
</template>
