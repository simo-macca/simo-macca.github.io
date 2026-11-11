<script setup>
/**
 * `</>` brand mark. The strokes draw in on first render (`animated`), and the
 * slash tilts when the parent link (`.group`) is hovered.
 * Colour follows `currentColor`.
 */
defineProps({
  animated: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g
      stroke="currentColor"
      stroke-width="11"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="{ 'logo-animated': animated }"
    >
      <path d="M 32,22 L 10,50 L 32,78" pathLength="100" />
      <path
        d="M 58,18 L 42,82"
        pathLength="100"
        class="origin-center opacity-80 transition-transform duration-300 group-hover:rotate-12"
      />
      <path d="M 68,22 L 90,50 L 68,78" pathLength="100" />
    </g>
  </svg>
</template>

<style scoped>
.logo-animated path {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: var(--animate-draw);
}

.logo-animated path:nth-child(2) {
  animation-delay: 150ms;
}

.logo-animated path:nth-child(3) {
  animation-delay: 300ms;
}
</style>
