<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: Array,
    default: () => [],
  },
  link: {
    type: String,
    default: null,
  },
  isInternship: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    class="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    :class="[
      isInternship ? 'border-l-4 border-l-blue-500 dark:border-l-blue-900' : '',
      link ? 'cursor-pointer' : 'cursor-default',
    ]"
  >
    <div class="flex h-full flex-col p-6">
      <h2 class="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
        {{ title }}
      </h2>
      <p class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
        {{ subtitle }}
      </p>
      <p class="mb-6 grow text-base leading-relaxed text-gray-600 dark:text-gray-300">
        {{ description }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in techStack"
          :key="tech"
          class="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </component>
</template>
