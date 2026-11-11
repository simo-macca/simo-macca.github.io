<script setup>
import { computed } from 'vue'
import { AlertCircle, CheckCircle2 } from '@lucide/vue'

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'success'].includes(value),
  },
})

const icon = computed(() => (props.variant === 'error' ? AlertCircle : CheckCircle2))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="message"
      class="mb-4 flex items-start gap-2 rounded-xl border p-3 text-sm"
      :class="
        variant === 'error'
          ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-400'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-400'
      "
      :role="variant === 'error' ? 'alert' : 'status'"
    >
      <component :is="icon" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>
