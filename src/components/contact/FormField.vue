<script setup>
import { computed } from 'vue'

/** Labelled input or textarea with accessible error messaging. Use with `v-model`. */
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    default: '',
  },
  rows: {
    type: [Number, String],
    default: 4,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
})

const model = defineModel({ type: String, required: true })

const errorId = computed(() => `${props.id}-error`)

const fieldClasses = computed(() => [
  'mt-2 w-full rounded-2xl border bg-white/70 px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-2xs transition duration-300 focus:bg-white focus:ring-4 focus:outline-none sm:text-sm dark:bg-white/3 dark:text-mist-100 dark:placeholder-mist-400/60 dark:focus:bg-white/5',
  props.error
    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15 dark:border-rose-500/70'
    : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/15 dark:border-white/10 dark:focus:border-brand-400 dark:focus:ring-brand-400/15',
])
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-slate-700 dark:text-mist-300">
      {{ label }} <span v-if="required" class="text-brand-500" aria-hidden="true">*</span>
    </label>

    <!-- text-base on mobile prevents iOS Safari from zooming into the field on focus -->
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      v-model="model"
      :name="id"
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? errorId : undefined"
      class="min-h-36 resize-y"
      :class="fieldClasses"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      :type="type"
      :name="id"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? errorId : undefined"
      :class="fieldClasses"
    />

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <p v-if="error" :id="errorId" class="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>
