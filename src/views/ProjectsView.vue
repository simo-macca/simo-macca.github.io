<script setup>
import { Rocket } from 'lucide-vue-next'
</script>

<template>
  <section id="projects" class="flex min-h-dvh flex-col items-center justify-center px-4 py-20">
    <div class="max-w-3xl text-center">
      <div class="relative mb-8 flex justify-center" v-motion-pop-in>
        <Rocket class="relative z-10 h-16 w-16 text-sky-500 dark:text-sky-400" />
        <div
          class="absolute -inset-4 animate-pulse rounded-full bg-sky-500/20 blur-xl dark:bg-sky-400/20"
        ></div>
      </div>

      <h2
        class="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
        v-motion-fade-in
        :delay="100"
      >
        Projects
      </h2>

      <div class="space-y-6" v-motion-fade-in :delay="200">
        <p class="text-xl text-slate-600 sm:text-2xl dark:text-slate-300">
          I'm currently
          <span class="font-medium text-sky-600 dark:text-sky-400">engineering</span> new personal
          projects that I can't wait to share.
        </p>

        <div class="mx-auto mt-10 max-w-xs">
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              class="h-full w-2/3 animate-pulse rounded-full bg-linear-to-r from-sky-600 to-blue-500 dark:from-sky-400"
            ></div>
          </div>
          <p
            class="mt-3 text-sm font-medium tracking-widest text-slate-500 uppercase dark:text-slate-400"
          >
            Development in progress
          </p>
        </div>

        <p class="pt-6 text-lg text-slate-500 italic dark:text-slate-400">
          Stay tuned for the official launch.
        </p>
      </div>
    </div>
  </section>
</template>
