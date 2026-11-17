<script setup>
import { computed } from 'vue'
import { ArrowDown, FileText, Layers, ScanSearch, Workflow } from '@lucide/vue'
import JourneyTimeline from '@/components/about/JourneyTimeline.vue'
import RichText from '@/components/common/RichText.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { journey } from '@/data/journey.js'
import { useSpotlight } from '@/composables/useSpotlight.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.about)
const { onPointerMove } = useSpotlight()

const pillarIcons = [Workflow, ScanSearch, Layers]
const pillars = computed(() =>
  t.value.pillars.map((pillar, index) => ({ ...pillar, icon: pillarIcons[index] })),
)
const journeyItems = computed(() => languageStore.localized(journey))
</script>

<template>
  <section class="py-24 sm:py-32" aria-labelledby="about-title">
    <SectionHeader
      heading-id="about-title"
      :index="1"
      :eyebrow="t.eyebrow"
      :title="t.sectionTitle"
      :subtitle="t.sectionSubtitle"
    />

    <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <!-- Narrative and pillars -->
      <div class="flex flex-col gap-10 lg:col-span-7">
        <div
          v-reveal
          class="space-y-5 text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-mist-400"
        >
          <p v-for="(paragraph, index) in t.narrative" :key="index">
            <RichText :segments="paragraph" />
          </p>
        </div>

        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <li v-for="(pillar, index) in pillars" :key="pillar.title" v-reveal="index * 90">
            <div
              class="group spotlight h-full surface-interactive surface-card p-5"
              @pointermove="onPointerMove"
            >
              <span
                class="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-brand-200/70 bg-brand-50 text-brand-600 transition-transform duration-500 ease-out-expo group-hover:-rotate-6 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-300"
                aria-hidden="true"
              >
                <component :is="pillar.icon" class="h-4.5 w-4.5" />
              </span>
              <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-mist-100">
                {{ pillar.title }}
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-mist-400">
                {{ pillar.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Journey and CV -->
      <aside class="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-5">
        <div v-reveal:left="100" class="surface-card p-6 sm:p-7">
          <h3 class="mb-6 eyebrow">{{ t.journeyTitle }}</h3>
          <JourneyTimeline
            :items="journeyItems"
            :labels="{ education: t.educationLabel, experience: t.experienceLabel }"
          />
        </div>

        <a
          v-reveal:left="180"
          :href="languageStore.cv.href"
          :download="languageStore.cv.fileName"
          class="group flex surface-interactive items-center gap-4 surface-card p-4 pr-5 focus-ring"
          :aria-label="t.cvAriaLabel"
        >
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-night-950"
            aria-hidden="true"
          >
            <FileText class="h-5 w-5" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold text-slate-900 dark:text-mist-100">
              {{ t.cvTitle }}
            </span>
            <span class="block text-xs text-slate-500 dark:text-mist-400">{{ t.cvSubtitle }}</span>
          </span>
          <span
            class="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-300"
          >
            {{ t.downloadCv }}
            <ArrowDown
              class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </a>
      </aside>
    </div>
  </section>
</template>
