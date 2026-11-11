<script setup>
/**
 * Renders a translated paragraph made of segments, so emphasis can be
 * translated without splitting sentences into many keys or using v-html.
 *
 * @example segments: ['Hi, I am ', { strong: 'Simone' }, '.']
 */
defineProps({
  segments: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <template v-for="(segment, index) in segments" :key="index">
    <strong
      v-if="typeof segment === 'object'"
      class="font-semibold text-slate-900 dark:text-mist-100"
      >{{ segment.strong }}</strong
    >
    <template v-else>{{ segment }}</template>
  </template>
</template>
