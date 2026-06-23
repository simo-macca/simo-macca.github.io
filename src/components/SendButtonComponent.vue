<script setup>
import { ref } from 'vue'
import { SendHorizontal, Check, X } from '@lucide/vue'

const state = ref('idle') // idle | loading | success | error

const submit = async (fn) => {
  state.value = 'loading'

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    await fn()
    state.value = 'success'
  } catch (err) {
    console.error(err)
    state.value = 'error'
  }

  setTimeout(() => {
    state.value = 'idle'
  }, 2000)
}

defineExpose({ submit })
</script>

<template>
  <button
    :disabled="state !== 'idle'"
    class="relative mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white uppercase transition-all duration-300 active:scale-95 disabled:opacity-60"
    :class="{
      'bg-sky-500 hover:bg-sky-600 dark:hover:bg-sky-400': state === 'idle',
      'cursor-wait bg-yellow-500': state === 'loading',
      'bg-green-600': state === 'success',
      'bg-red-600': state === 'error',
    }"
  >
    <!-- IDLE -->
    <span v-if="state === 'idle'" class="flex items-center gap-2">
      Send Message
      <SendHorizontal />
    </span>

    <!-- LOADING -->
    <span v-if="state === 'loading'" class="flex items-center gap-2">
      <span
        class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
      ></span>
      Processing...
    </span>

    <!-- SUCCESS -->
    <span v-if="state === 'success'" class="flex items-center gap-2">
      <Check :stroke-width="3" />
      Sent!
    </span>

    <!-- ERROR -->
    <span v-if="state === 'error'" class="flex items-center gap-2">
      <X :stroke-width="3" />
      Error, try again
    </span>
  </button>
</template>
