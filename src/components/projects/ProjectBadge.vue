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
    validator: (value) => ['default', 'neutral'].includes(value),
  },
})
</script>

<template>
  <span
    class="chip"
    :class="{ 'border-dashed text-slate-400 dark:text-mist-400': variant === 'neutral' }"
  >
    {{ text }}
  </span>
</template>
