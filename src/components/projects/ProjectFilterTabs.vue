<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
    <button
      v-for="cat in categories"
      :key="cat.id"
      type="button"
      @click="$emit('update:modelValue', cat.id)"
      class="rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
      :class="[
        modelValue === cat.id
          ? 'bg-sky-600 text-white shadow-xs dark:bg-sky-500'
          : 'border border-slate-200/80 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100 dark:border-white/8 dark:bg-[#111827]/80 dark:text-[#9CA3AF] dark:hover:border-white/16 dark:hover:bg-[#1F2937] dark:hover:text-[#F3F4F6]',
      ]"
      :aria-pressed="modelValue === cat.id"
    >
      {{ cat.label }}
    </button>
  </div>
</template>
