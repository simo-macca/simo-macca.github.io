<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { Check, Loader2, SendHorizontal, X } from '@lucide/vue'
import { useLanguageStore } from '@/stores/language.js'

/**
 * Submit button with idle → loading → success | error states.
 * The parent calls `submit(asyncFn)` through a template ref; the state resets
 * to idle after `RESET_DELAY_MS`.
 */
const RESET_DELAY_MS = 3000

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.contact.button)

const state = ref('idle') // 'idle' | 'loading' | 'success' | 'error'
let resetTimer = null

const icons = { idle: SendHorizontal, loading: Loader2, success: Check, error: X }

const stateClasses = {
  idle: 'bg-sky-600 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-500/20 active:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400',
  loading: 'cursor-wait bg-amber-600',
  success: 'bg-emerald-600',
  error: 'bg-rose-600',
}

async function submit(task) {
  clearTimeout(resetTimer)
  state.value = 'loading'

  try {
    await task()
    state.value = 'success'
  } catch (error) {
    console.error(error)
    state.value = 'error'
  }

  resetTimer = setTimeout(() => {
    state.value = 'idle'
  }, RESET_DELAY_MS)
}

onBeforeUnmount(() => clearTimeout(resetTimer))

defineExpose({ submit })
</script>

<template>
  <button
    type="submit"
    :disabled="state !== 'idle'"
    class="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold tracking-wide text-white uppercase shadow-sm focus-ring transition-all duration-300 focus-visible:ring-offset-2 active:scale-98 disabled:cursor-not-allowed disabled:opacity-80 dark:focus-visible:ring-offset-slate-900"
    :class="stateClasses[state]"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <span :key="state" class="inline-flex items-center gap-2">
        <span>{{ t[state] }}</span>
        <component
          :is="icons[state]"
          class="h-4 w-4"
          :class="{ 'animate-spin': state === 'loading' }"
          :stroke-width="state === 'success' || state === 'error' ? 3 : 2"
          aria-hidden="true"
        />
      </span>
    </Transition>
    <span class="sr-only" role="status" aria-live="polite">{{
      state === 'idle' ? '' : t[state]
    }}</span>
  </button>
</template>
