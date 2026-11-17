<script setup>
/**
 * Infinitely scrolling row of technologies. The list is rendered twice and
 * shifted by -50% so the loop is seamless; the copy is hidden from assistive
 * technology. Hovering pauses it; reduced motion stops it.
 */
defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="group relative overflow-hidden fade-x py-1" role="region" :aria-label="label">
    <div
      class="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
    >
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex shrink-0 items-center"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <li
          v-for="item in items"
          :key="item"
          class="flex items-center gap-6 pe-6 font-mono text-sm whitespace-nowrap text-slate-500 dark:text-mist-400"
        >
          {{ item }}
          <span class="h-1 w-1 rounded-full bg-brand-400/60" aria-hidden="true" />
        </li>
      </ul>
    </div>
  </div>
</template>
