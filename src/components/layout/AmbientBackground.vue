<template>
  <!-- Decorative, slowly drifting colour glows behind the hero -->
  <div
    class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 overflow-hidden"
    aria-hidden="true"
  >
    <div class="absolute -top-24 left-1/2 h-96 w-160 -translate-x-1/2 sm:w-240">
      <div
        class="absolute inset-0 animate-float-slow rounded-full bg-linear-to-tr from-sky-400 via-indigo-400 to-cyan-300 opacity-40 blur-3xl dark:opacity-20"
      />
    </div>
    <div
      class="absolute top-40 -left-24 h-72 w-72 animate-float-slower rounded-full bg-indigo-400 opacity-25 blur-3xl sm:left-[10%] dark:opacity-15"
    />
    <div
      class="absolute top-56 -right-24 h-72 w-72 animate-float-slow rounded-full bg-cyan-300 opacity-25 blur-3xl sm:right-[10%] dark:opacity-10"
    />
    <!-- Subtle dot grid, faded out towards the bottom -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle,rgb(100_116_139/0.18)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_85%)] bg-size-[28px_28px] dark:bg-[radial-gradient(circle,rgb(148_163_184/0.08)_1px,transparent_1px)]"
    />
  </div>
</template>
