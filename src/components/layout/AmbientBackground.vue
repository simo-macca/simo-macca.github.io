<template>
  <!-- Decorative backdrop: a faint grid and slowly drifting colour glows behind the hero -->
  <div
    class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-224 overflow-hidden"
    aria-hidden="true"
  >
    <div class="absolute inset-0 bg-grid" />
    <div
      class="absolute -top-40 left-1/2 h-128 w-3xl -translate-x-1/2 animate-float-slow rounded-full bg-radial from-brand-400 to-transparent to-70% opacity-35 blur-3xl dark:opacity-25"
    />
    <div
      class="absolute top-32 -left-32 h-96 w-96 animate-float-slower rounded-full bg-radial from-violet-400 to-transparent to-70% opacity-30 blur-3xl sm:left-1/16 dark:opacity-15"
    />
    <div
      class="absolute top-64 -right-32 h-96 w-96 animate-float-slow rounded-full bg-radial from-cyan-400 to-transparent to-70% opacity-25 blur-3xl sm:right-1/16 dark:opacity-10"
    />
  </div>
</template>
