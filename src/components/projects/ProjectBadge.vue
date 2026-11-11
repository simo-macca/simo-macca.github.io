<script setup>
/** Small monospace chip for technologies and project metadata. */
defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'accent', 'neutral'].includes(value),
  },
})

const variantClasses = {
  accent:
    'border-sky-400/40 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300',
  neutral:
    'border-slate-200/80 bg-slate-100/70 text-slate-500 dark:border-white/8 dark:bg-white/4 dark:text-slate-400',
  default:
    'border-slate-200/70 bg-slate-100/80 text-slate-700 dark:border-white/6 dark:bg-night-800/90 dark:text-mist-100',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium transition-colors sm:text-xs"
    :class="variantClasses[variant]"
  >
    {{ text }}
  </span>
</template>
