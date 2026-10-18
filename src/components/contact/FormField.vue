<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
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
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'input'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input')
}
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-[#9CA3AF]"
    >
      {{ label }} <span v-if="required" class="text-rose-500">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :name="id"
      :value="modelValue"
      @input="onInput"
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="mt-1.5 min-h-[100px] w-full rounded-xl border bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-white/[0.08] dark:bg-[#0B0F17]/60 dark:text-[#F3F4F6] dark:placeholder-slate-500 dark:focus:border-sky-400 dark:focus:bg-[#0B0F17] dark:focus:ring-sky-400/20"
      :class="
        error
          ? 'border-rose-400 dark:border-rose-500'
          : 'border-slate-200/80 dark:border-white/[0.08]'
      "
    />

    <input
      v-else
      :type="type"
      :id="id"
      :name="id"
      :value="modelValue"
      @input="onInput"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="mt-1.5 w-full rounded-xl border bg-slate-50/70 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-white/[0.08] dark:bg-[#0B0F17]/60 dark:text-[#F3F4F6] dark:placeholder-slate-500 dark:focus:border-sky-400 dark:focus:bg-[#0B0F17] dark:focus:ring-sky-400/20"
      :class="
        error
          ? 'border-rose-400 dark:border-rose-500'
          : 'border-slate-200/80 dark:border-white/[0.08]'
      "
    />

    <p v-if="error" :id="`${id}-error`" class="mt-1 text-xs text-rose-500" role="alert">
      {{ error }}
    </p>
  </div>
</template>
