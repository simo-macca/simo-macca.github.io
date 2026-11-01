<script setup>
import { computed } from 'vue'
import profileImg from '@/components/icons/my_profile.jpeg'
import { BookOpen, Cpu, Database, FileDown, Network } from '@lucide/vue'
import { useLanguageStore } from '@/stores/LanguageStore.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.about)

const pillarIcons = [Database, Cpu, Network]
const pillars = computed(() =>
  t.value.pillars.map((pillar, index) => ({
    ...pillar,
    icon: pillarIcons[index],
  })),
)
</script>

<template>
  <section class="py-20" aria-label="About section">
    <div class="mx-auto max-w-6xl">
      <!-- Section Header -->
      <div class="mb-14 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          {{ t.sectionTitle }}
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          {{ t.sectionSubtitle }}
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <!-- Left Column: Profile & Academic Snapshot -->
        <div class="flex flex-col items-center lg:col-span-4" v-motion-slide-left :delay="150">
          <div class="group relative">
            <!-- Glow background -->
            <div
              class="absolute -inset-1 rounded-full bg-linear-to-r from-sky-500 to-indigo-500 opacity-30 blur-md transition duration-300 group-hover:opacity-50"
            />
            <img
              :src="profileImg"
              alt="Simone Maccario - MSc Computer Science at ETH Zurich"
              class="relative h-56 w-56 rounded-full border-4 border-white object-cover shadow-xl dark:border-[#111827] dark:shadow-sky-950/30"
              width="224"
              height="224"
              loading="lazy"
            />
          </div>

          <!-- Academic Snapshot Card -->
          <div
            class="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xs backdrop-blur-sm dark:border-white/8 dark:bg-[#111827]/80"
          >
            <div
              class="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-[#F3F4F6]"
            >
              <BookOpen class="h-4 w-4 text-sky-500 dark:text-sky-400" />
              <span>{{ t.academicTrajectory }}</span>
            </div>
            <ul class="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
              <li class="border-b border-slate-100 pb-2.5 dark:border-white/4">
                <strong class="block text-slate-800 dark:text-[#F3F4F6]">{{ t.ethOrg }}</strong>
                <span>{{ t.ethDegree }}</span>
              </li>
              <li>
                <strong class="block text-slate-800 dark:text-[#F3F4F6]">{{ t.usiOrg }}</strong>
                <span>{{ t.usiDegree }}</span>
              </li>
            </ul>
          </div>

          <!-- Download CV Action Button -->
          <a
            :href="languageStore.cvLink"
            target="_blank"
            rel="noopener noreferrer"
            :download="languageStore.cvFileName"
            class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-sm transition-all duration-200 hover:border-sky-400/50 hover:bg-slate-50 hover:text-sky-600 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 sm:text-sm dark:border-white/8 dark:bg-[#111827]/80 dark:text-[#F3F4F6] dark:hover:border-sky-500/30 dark:hover:bg-[#1F2937] dark:hover:text-sky-400"
            :aria-label="t.cvAriaLabel"
          >
            <FileDown class="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>{{ t.downloadCv }}</span>
          </a>
        </div>

        <!-- Right Column: Narrative & Technical Pillars -->
        <div class="flex flex-col gap-6 lg:col-span-8" v-motion-slide-right :delay="250">
          <div class="space-y-4 text-base leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
            <p>
              {{ t.narrativeP1Before }}
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]">
                {{ t.narrativeP1Degree }}
              </strong>
              {{ t.narrativeP1Middle }}
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]">
                {{ t.narrativeP1Spec }}
              </strong>
              {{ t.narrativeP1After }}
            </p>
            <p>
              {{ t.narrativeP2 }}
            </p>
            <p>
              {{ t.narrativeP3Before }}
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]">
                {{ t.narrativeP3Tech1 }}
              </strong>
              {{ t.narrativeP3Middle }}
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]">
                {{ t.narrativeP3Tech2 }}
              </strong>
              {{ t.narrativeP3After }}
            </p>
          </div>

          <!-- Technical Pillars -->
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-2xs backdrop-blur-sm transition-all hover:border-sky-400/40 dark:border-white/8 dark:bg-[#111827]/70"
            >
              <component
                :is="pillar.icon"
                class="mb-2 h-5 w-5 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              <h3 class="text-sm font-bold text-slate-900 dark:text-[#F3F4F6]">
                {{ pillar.title }}
              </h3>
              <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
