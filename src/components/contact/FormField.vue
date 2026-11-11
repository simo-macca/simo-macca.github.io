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
  'mt-1.5 w-full rounded-xl border bg-slate-50/70 px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:outline-none sm:text-sm dark:bg-night-950/60 dark:text-mist-100 dark:placeholder-slate-500 dark:focus:border-sky-400 dark:focus:bg-night-950 dark:focus:ring-sky-400/20',
  props.error ? 'border-rose-400 dark:border-rose-500' : 'border-slate-200/80 dark:border-white/8',
])
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-mist-400"
    >
      {{ label }} <span v-if="required" class="text-rose-500" aria-hidden="true">*</span>
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
      class="min-h-28 resize-y"
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

    <p v-if="error" :id="errorId" class="mt-1 text-xs text-rose-500">
      {{ error }}
    </p>
  </div>
</template>
