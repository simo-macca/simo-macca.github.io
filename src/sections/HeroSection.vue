<script setup>
import { computed } from 'vue'
import { ArrowDown, ArrowRight, GraduationCap } from '@lucide/vue'
import profileImg from '@/assets/images/profile.webp'
import RichText from '@/components/common/RichText.vue'
import SocialLinks from '@/components/common/SocialLinks.vue'
import TechMarquee from '@/components/common/TechMarquee.vue'
import { skillCategories } from '@/data/skills.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.hero)

// Language-neutral technology names from the skills data feed the marquee.
const technologies = [
  ...new Set(
    skillCategories.flatMap((category) =>
      category.skills.filter((skill) => typeof skill === 'string'),
    ),
  ),
]
</script>

<template>
  <section
    class="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center pt-10 pb-12 sm:pt-16"
    :aria-label="t.sectionLabel"
  >
    <div class="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
      <!-- Copy -->
      <div class="order-2 lg:order-1">
        <p
          v-reveal:down
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/8 dark:text-emerald-300"
        >
          <span class="relative flex h-2 w-2" aria-hidden="true">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden"
            />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {{ t.availability }}
        </p>

        <p v-reveal="60" class="font-mono text-sm text-slate-500 dark:text-mist-400">
          {{ t.greeting }}
        </p>

        <h1
          v-reveal="120"
          class="mt-3 text-4xl leading-none font-semibold tracking-tighter text-balance text-slate-900 sm:text-6xl lg:text-7xl dark:text-mist-100"
        >
          {{ t.titlePrefix }}
          <span class="text-gradient animate-gradient-pan">{{ t.titleGradient }}</span>
        </h1>

        <p
          v-reveal="200"
          class="mt-6 max-w-xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-mist-400"
        >
          <RichText :segments="t.pitch" />
        </p>

        <div v-reveal="280" class="mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" class="group btn-primary h-12 px-6 text-sm">
            <span>{{ t.exploreProjects }}</span>
            <ArrowRight
              class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a href="#contact" class="btn-secondary h-12 px-6 text-sm">
            {{ t.getInTouch }}
          </a>
          <SocialLinks class="ms-1" />
        </div>
      </div>

      <!-- Portrait -->
      <div
        v-reveal:scale="100"
        class="order-1 mx-auto w-full max-w-68 sm:max-w-xs lg:order-2 lg:max-w-sm"
      >
        <div class="relative">
          <div
            class="absolute -inset-3 rounded-4xl bg-conic-180 from-brand-400 via-violet-400 to-cyan-400 opacity-30 blur-2xl dark:opacity-25"
            aria-hidden="true"
          />
          <div
            class="relative overflow-hidden rounded-4xl border border-white/60 bg-white p-1.5 shadow-2xl shadow-slate-900/20 dark:border-white/10 dark:bg-night-800"
          >
            <img
              :src="profileImg"
              :alt="t.profileAlt"
              class="aspect-square w-full rounded-3xl object-cover"
              width="480"
              height="480"
              fetchpriority="high"
              decoding="async"
            />
          </div>

          <!-- Floating credential -->
          <div
            class="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 py-2.5 pr-4 pl-2.5 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:-left-8 dark:border-white/10 dark:bg-night-800/90"
          >
            <span
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white dark:bg-brand-500"
              aria-hidden="true"
            >
              <GraduationCap class="h-4.5 w-4.5" />
            </span>
            <span class="leading-tight">
              <span class="block text-sm font-semibold text-slate-900 dark:text-mist-100">
                {{ t.photoBadgeTitle }}
              </span>
              <span class="block text-xs text-slate-500 dark:text-mist-400">
                {{ t.photoBadgeSubtitle }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- At a glance -->
    <dl
      v-reveal="360"
      class="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-200/80 lg:grid-cols-4 dark:border-white/7 dark:bg-white/7"
    >
      <div
        v-for="fact in t.facts"
        :key="fact.label"
        class="bg-white/80 px-5 py-4 backdrop-blur-xl dark:bg-night-900/80"
      >
        <dt class="font-mono text-2xs tracking-wider text-slate-400 uppercase dark:text-mist-400">
          {{ fact.label }}
        </dt>
        <dd class="mt-1 text-sm font-medium text-slate-900 dark:text-mist-100">{{ fact.value }}</dd>
      </div>
    </dl>

    <TechMarquee v-reveal="440" class="mt-8" :items="technologies" :label="t.stackLabel" />

    <a
      href="#about"
      class="mx-auto mt-10 hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 text-slate-400 focus-ring transition-colors hover:border-brand-300 hover:text-brand-600 lg:flex dark:border-white/10 dark:text-mist-400 dark:hover:text-brand-300"
      :aria-label="t.scrollHint"
    >
      <ArrowDown class="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
    </a>
  </section>
</template>
