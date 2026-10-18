<script setup>
import { ArrowDown, ArrowRight, GraduationCap, Sparkles } from '@lucide/vue'

const techHighlights = [
  'Data Management Systems',
  'Distributed Computing',
  'Machine Intelligence',
  'Full-Stack Architecture',
]
</script>

<template>
  <section
    class="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-16 text-center sm:py-20"
    aria-label="Hero section"
  >
    <!-- Academic Badge -->
    <div
      class="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-50/80 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-xs backdrop-blur-sm sm:text-sm dark:border-sky-400/20 dark:bg-sky-950/40 dark:text-sky-300"
      v-motion-slide-down
      :delay="100"
    >
      <GraduationCap class="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      <span>ETH Zurich &middot; MSc in Computer Science</span>
      <span class="hidden text-slate-300 sm:inline dark:text-slate-600">&vert;</span>
      <span class="hidden font-semibold sm:inline">Data Management &amp; Machine Intelligence</span>
    </div>

    <!-- Main Title -->
    <h1
      class="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl dark:text-[#F3F4F6]"
      v-motion-slide-up
      :delay="200"
    >
      Engineering Reliable <br class="hidden sm:inline" />
      <span class="text-gradient">Data Systems &amp; Intelligence</span>
    </h1>

    <!-- Subtitle / Pitch -->
    <p
      class="mt-6 max-w-2xl px-4 text-base leading-relaxed text-slate-600 sm:text-xl dark:text-[#9CA3AF]"
      v-motion-slide-up
      :delay="300"
    >
      Hi, I'm
      <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]">Simone Maccario</strong>. I
      specialize in distributed data management, database optimization, algorithmic problem-solving,
      and high-performance full-stack architectures.
    </p>

    <!-- Domain Highlights Chips -->
    <div class="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3" v-motion-slide-up :delay="350">
      <span
        v-for="chip in techHighlights"
        :key="chip"
        class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#111827]/70 dark:text-[#9CA3AF]"
      >
        <Sparkles class="h-3 w-3 text-sky-500 dark:text-sky-400" aria-hidden="true" />
        {{ chip }}
      </span>
    </div>

    <!-- Action Buttons -->
    <div
      class="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
      v-motion-slide-up
      :delay="400"
    >
      <a
        href="#projects"
        class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-500/20 active:scale-95 sm:w-auto dark:bg-sky-500 dark:hover:bg-sky-400"
      >
        <span>Explore Case Studies</span>
        <ArrowRight class="h-4 w-4" aria-hidden="true" />
      </a>
      <a
        href="#about"
        class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-7 text-sm font-semibold tracking-wide text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-100 active:scale-95 sm:w-auto dark:border-white/[0.08] dark:bg-[#111827]/80 dark:text-[#F3F4F6] dark:hover:border-white/[0.16] dark:hover:bg-[#1F2937]"
      >
        <span>Technical Background</span>
        <ArrowDown class="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
