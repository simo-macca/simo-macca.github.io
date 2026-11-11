<script setup>
import { computed } from 'vue'
import { ArrowRight, ChevronDown, GraduationCap, Mail, Sparkles } from '@lucide/vue'
import RichText from '@/components/common/RichText.vue'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.hero)
</script>

<template>
  <section
    class="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-16 text-center sm:py-20"
    :aria-label="t.sectionLabel"
  >
    <!-- Availability -->
    <p
      class="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-3 py-1 text-xs font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300"
      v-motion-slide-down
      :delay="50"
    >
      <span class="relative flex h-2 w-2" aria-hidden="true">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden"
        />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      {{ t.availability }}
    </p>

    <!-- Academic badge -->
    <p
      class="mb-6 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-sky-500/30 bg-sky-50/80 px-4 py-1.5 text-xs font-medium text-sky-700 shadow-xs backdrop-blur-sm sm:text-sm dark:border-sky-400/20 dark:bg-sky-950/40 dark:text-sky-300"
      v-motion-slide-down
      :delay="120"
    >
      <GraduationCap class="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      <span>{{ t.academicBadgeOrg }} &middot; {{ t.academicBadgeDegree }}</span>
      <span class="hidden text-slate-300 sm:inline dark:text-slate-600" aria-hidden="true">|</span>
      <span class="hidden font-semibold sm:inline">{{ t.academicBadgeTrack }}</span>
    </p>

    <h1
      class="max-w-4xl text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-6xl md:text-7xl dark:text-mist-100"
      v-motion-slide-up
      :delay="200"
    >
      {{ t.titlePrefix }} <br class="hidden sm:inline" />
      <span class="text-gradient animate-gradient-pan">{{ t.titleGradient }}</span>
    </h1>

    <p
      class="mt-6 max-w-2xl px-2 text-base leading-relaxed text-pretty text-slate-600 sm:text-xl dark:text-mist-400"
      v-motion-slide-up
      :delay="300"
    >
      <RichText :segments="t.pitch" />
    </p>

    <ul class="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3" v-motion-slide-up :delay="350">
      <li
        v-for="chip in t.chips"
        :key="chip"
        class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-sm transition-colors hover:border-sky-400/50 dark:border-white/8 dark:bg-night-900/70 dark:text-mist-400"
      >
        <Sparkles class="h-3 w-3 text-sky-500 dark:text-sky-400" aria-hidden="true" />
        {{ chip }}
      </li>
    </ul>

    <div
      class="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
      v-motion-slide-up
      :delay="420"
    >
      <a
        href="#projects"
        class="group btn-primary h-12 w-full px-7 text-sm tracking-wide sm:w-auto"
      >
        <span>{{ t.exploreProjects }}</span>
        <ArrowRight
          class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
      <a
        href="#contact"
        class="group btn-secondary h-12 w-full px-7 text-sm tracking-wide sm:w-auto"
      >
        <Mail
          class="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12"
          aria-hidden="true"
        />
        <span>{{ t.getInTouch }}</span>
      </a>
    </div>

    <!-- Scroll hint (large, tall screens only, so it never overlaps the buttons) -->
    <a
      href="#about"
      class="absolute bottom-6 hidden h-10 w-10 items-center justify-center rounded-full text-slate-400 focus-ring transition-colors hover:text-sky-500 dark:text-slate-500 lg:[@media(min-height:760px)]:flex"
      :aria-label="t.scrollHint"
    >
      <ChevronDown class="h-6 w-6 animate-bounce-soft" aria-hidden="true" />
    </a>
  </section>
</template>
