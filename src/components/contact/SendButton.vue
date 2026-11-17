<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { Check, LoaderCircle, SendHorizontal, X } from '@lucide/vue'
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

const icons = { idle: SendHorizontal, loading: LoaderCircle, success: Check, error: X }

const stateClasses = {
  idle: 'bg-slate-900 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/30 dark:bg-white dark:text-night-950 dark:hover:bg-brand-300',
  loading: 'cursor-wait bg-slate-700 dark:bg-mist-300 dark:text-night-950',
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
    class="relative mt-7 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-medium text-white shadow-sm focus-ring transition duration-300 ease-out-expo active:scale-98 disabled:cursor-not-allowed sm:ms-auto sm:w-auto sm:min-w-52"
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
