<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'default', // 'default' | 'accent' | 'neutral'
  },
})
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition-colors"
    :class="[
      variant === 'accent'
        ? 'border-sky-400/40 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300'
        : variant === 'neutral'
          ? 'border-slate-200/80 bg-slate-100/70 text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400'
          : 'border-slate-200/70 bg-slate-100/80 text-slate-700 group-hover:border-sky-300/40 dark:border-white/[0.06] dark:bg-[#1F2937]/90 dark:text-[#F3F4F6]',
    ]"
  >
    {{ text }}
  </span>
</template>
