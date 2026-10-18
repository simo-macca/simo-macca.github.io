<script setup>
import { ref } from 'vue'
import { SendHorizontal, Check, X, Loader2 } from '@lucide/vue'

const state = ref('idle') // idle | loading | success | error

const submit = async (fn) => {
  state.value = 'loading'

  try {
    await fn()
    state.value = 'success'
  } catch (err) {
    console.error(err)
    state.value = 'error'
  }

  setTimeout(() => {
    state.value = 'idle'
  }, 3000)
}

defineExpose({ submit })
</script>

<template>
  <button
    type="submit"
    :disabled="state !== 'idle'"
    class="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-98 disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-slate-900"
    :class="{
      'bg-sky-600 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-500/20 active:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400':
        state === 'idle',
      'cursor-wait bg-amber-600': state === 'loading',
      'bg-emerald-600': state === 'success',
      'bg-rose-600': state === 'error',
    }"
  >
    <!-- IDLE -->
    <span v-if="state === 'idle'" class="inline-flex items-center gap-2">
      Send Message
      <SendHorizontal class="h-4 w-4" aria-hidden="true" />
    </span>

    <!-- LOADING -->
    <span
      v-else-if="state === 'loading'"
      class="inline-flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <Loader2 class="h-4 w-4 animate-spin" aria-hidden="true" />
      <span>Sending...</span>
    </span>

    <!-- SUCCESS -->
    <span
      v-else-if="state === 'success'"
      class="inline-flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <Check class="h-4 w-4" :stroke-width="3" aria-hidden="true" />
      <span>Message Sent!</span>
    </span>

    <!-- ERROR -->
    <span
      v-else-if="state === 'error'"
      class="inline-flex items-center gap-2"
      role="status"
      aria-live="polite"
    >
      <X class="h-4 w-4" :stroke-width="3" aria-hidden="true" />
      <span>Failed, Please Try Again</span>
    </span>
  </button>
</template>
