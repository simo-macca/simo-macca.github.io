<script setup>
import { computed } from 'vue'
import { Cpu, Database, FileDown, Layers, Route } from '@lucide/vue'
import profileImg from '@/assets/images/profile.webp'
import JourneyTimeline from '@/components/about/JourneyTimeline.vue'
import RichText from '@/components/common/RichText.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { journey } from '@/data/journey.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.about)

const pillarIcons = [Database, Cpu, Layers]
const pillars = computed(() =>
  t.value.pillars.map((pillar, index) => ({ ...pillar, icon: pillarIcons[index] })),
)
const journeyItems = computed(() => languageStore.localized(journey))
</script>

<template>
  <section class="py-20" aria-labelledby="about-title">
    <div class="mx-auto max-w-6xl">
      <SectionHeader
        heading-id="about-title"
        :eyebrow="t.eyebrow"
        :title="t.sectionTitle"
        :subtitle="t.sectionSubtitle"
      />

      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <!-- Profile, journey and CV -->
        <div class="flex flex-col items-center lg:col-span-4" v-motion-slide-left :delay="150">
          <div class="group relative">
            <div
              class="absolute -inset-1.5 animate-gradient-pan rounded-full bg-linear-to-r from-sky-500 via-indigo-500 to-cyan-400 bg-size-[200%_auto] opacity-40 blur-md transition duration-300 group-hover:opacity-70"
              aria-hidden="true"
            />
            <img
              :src="profileImg"
              :alt="t.profileAlt"
              class="relative h-48 w-48 rounded-full border-4 border-white object-cover shadow-xl transition-transform duration-500 group-hover:scale-[1.02] sm:h-56 sm:w-56 dark:border-night-900 dark:shadow-sky-950/30"
              width="224"
              height="224"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="mt-6 w-full surface-card p-5">
            <h3
              class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-mist-100"
            >
              <Route class="h-4 w-4 text-sky-500 dark:text-sky-400" aria-hidden="true" />
              {{ t.journeyTitle }}
            </h3>
            <JourneyTimeline
              class="ms-3.5"
              :items="journeyItems"
              :labels="{ education: t.educationLabel, experience: t.experienceLabel }"
            />
          </div>

          <a
            :href="languageStore.cv.href"
            :download="languageStore.cv.fileName"
            class="group mt-4 btn-secondary w-full px-4 py-3 text-xs sm:text-sm"
            :aria-label="t.cvAriaLabel"
          >
            <FileDown
              class="h-4 w-4 text-sky-600 transition-transform duration-200 group-hover:translate-y-0.5 dark:text-sky-400"
              aria-hidden="true"
            />
            <span>{{ t.downloadCv }}</span>
          </a>
        </div>

        <!-- Narrative and pillars -->
        <div class="flex flex-col gap-6 lg:col-span-8" v-motion-slide-right :delay="250">
          <div class="space-y-4 text-base leading-relaxed text-slate-600 dark:text-mist-400">
            <p v-for="(paragraph, index) in t.narrative" :key="index">
              <RichText :segments="paragraph" />
            </p>
          </div>

          <ul class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li
              v-for="(pillar, index) in pillars"
              :key="pillar.title"
              v-motion-pop-in
              :delay="300 + index * 100"
            >
              <div
                class="group h-full rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/40 hover:shadow-md dark:border-white/8 dark:bg-night-900/70"
              >
                <span
                  class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950/50 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white"
                >
                  <component :is="pillar.icon" class="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 class="text-sm font-bold text-slate-900 dark:text-mist-100">
                  {{ pillar.title }}
                </h3>
                <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-mist-400">
                  {{ pillar.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
