<script setup>
import { AlertCircle } from '@lucide/vue'

defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'error', // 'error' | 'success'
  },
})
</script>

<template>
  <div
    v-if="message"
    class="mb-4 flex items-center gap-2 rounded-xl border p-3 text-sm"
    :class="[
      variant === 'error'
        ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400'
        : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400',
    ]"
    role="alert"
  >
    <AlertCircle class="h-4 w-4 shrink-0" aria-hidden="true" />
    <span>{{ message }}</span>
  </div>
</template>
