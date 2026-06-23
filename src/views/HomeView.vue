<script setup></script>

<template>
  <section class="flex min-h-dvh flex-col items-center justify-center gap-4">
    <h1 class="text-4xl font-bold md:text-7xl" v-motion-slide-up :delay="100">
      Hi, I'm <span class="text-sky-500 dark:text-sky-400">Simone</span>
    </h1>
    <p
      class="max-w-2xl px-4 text-justify text-xl text-slate-600 sm:my-4 sm:text-2xl md:text-center dark:text-slate-300"
      v-motion-slide-up
      :delay="200"
    >
      An aspiring Full-Stack Developer and Computer Science student, passionate about building clean
      and functional web applications.
    </p>
    <div
      class="flex w-full items-center justify-between gap-4 sm:w-100 sm:min-w-min"
      v-motion-slide-up
      :delay="300"
    >
      <a
        href="#contact"
        class="flex max-h-15 w-1/2 items-center justify-center rounded-lg bg-sky-500 py-3 text-white shadow-lg transition-colors hover:bg-sky-600 sm:px-6 sm:text-xl dark:hover:bg-sky-400"
        >Get in Touch</a
      >
      <a
        href="#projects"
        class="flex max-h-15 w-1/2 items-center justify-center rounded-lg bg-white py-3 text-slate-900 shadow-lg transition-colors hover:bg-slate-100 sm:px-6 sm:text-xl dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >View My Work</a
      >
    </div>
  </section>
</template>
