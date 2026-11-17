<script setup>
import { computed } from 'vue'
import { ArrowRight, Check, Star } from '@lucide/vue'
import ProjectBadge from '@/components/projects/ProjectBadge.vue'
import ProjectLinks from '@/components/projects/ProjectLinks.vue'
import { useSpotlight } from '@/composables/useSpotlight.js'
import { useLanguageStore } from '@/stores/language.js'

/**
 * Project preview. The full details open in `ProjectDetailsDialog` via the
 * "View details" button or by clicking any non-interactive part of the card.
 * The flagship project gets a gradient frame and a wide two-column layout with
 * a preview of its key results.
 */
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open'])

const MAX_VISIBLE_TAGS = 5
const MAX_PREVIEW_HIGHLIGHTS = 3

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)
const { onPointerMove } = useSpotlight()

const visibleTags = computed(() => props.project.tags.slice(0, MAX_VISIBLE_TAGS))
const hiddenTagCount = computed(() => Math.max(0, props.project.tags.length - MAX_VISIBLE_TAGS))
const previewHighlights = computed(() =>
  (props.project.highlights ?? []).slice(0, MAX_PREVIEW_HIGHLIGHTS),
)

const openDetails = () => emit('open', props.project.id)

/** Clicks on the card surface open the dialog; links and buttons keep their own action. */
const onCardClick = (event) => {
  if (event.target.closest('a, button')) return
  openDetails()
}
</script>

<template>
  <!-- Gradient frame for the flagship (1px padding shows the gradient as a border) -->
  <div
    class="group/frame h-full rounded-3xl"
    :class="
      project.isFlagship
        ? 'bg-linear-to-br from-brand-400/70 via-violet-400/40 to-cyan-400/60 p-px shadow-xl shadow-brand-500/15 transition duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/25 dark:from-brand-400/50 dark:via-violet-400/20 dark:to-cyan-400/40'
        : ''
    "
  >
    <article
      :id="`project-${project.id}`"
      class="group spotlight flex h-full cursor-pointer flex-col overflow-hidden surface-card"
      :class="
        project.isFlagship
          ? 'border-transparent! bg-white/96! dark:border-transparent! dark:bg-night-900/96!'
          : 'surface-interactive'
      "
      @click="onCardClick"
      @pointermove="onPointerMove"
    >
      <div
        class="grid grow gap-8 p-6 sm:p-8"
        :class="{ 'lg:grid-cols-[1.4fr_1fr] lg:gap-12': project.isFlagship }"
      >
        <div class="flex flex-col">
          <!-- Icon + badges -->
          <div class="mb-6 flex items-center gap-3">
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition duration-500 ease-out-expo group-hover:scale-105 group-hover:-rotate-6"
              :class="
                project.isFlagship
                  ? 'border-transparent bg-brand-600 text-white shadow-md shadow-brand-500/30 dark:bg-brand-500'
                  : 'border-slate-200/80 bg-white text-slate-700 shadow-xs dark:border-white/10 dark:bg-night-800 dark:text-mist-300'
              "
              aria-hidden="true"
            >
              <component :is="project.icon" class="h-5 w-5" />
            </span>
            <div class="flex min-w-0 flex-wrap items-center gap-1.5">
              <span
                v-if="project.isFlagship"
                class="inline-flex items-center gap-1 rounded-full bg-brand-600/10 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-400/15 dark:text-brand-200"
              >
                <Star class="h-3 w-3 fill-current" aria-hidden="true" />
                {{ t.flagshipBadge }}
              </span>
              <span class="text-xs font-medium text-slate-500 dark:text-mist-400">
                {{ t.contextBadges[project.category] }}
              </span>
            </div>
          </div>

          <!-- Title, role, summary -->
          <p class="mb-2 eyebrow text-2xs tracking-widest">{{ project.domain }}</p>
          <h3
            class="font-semibold tracking-tight text-balance text-slate-900 dark:text-mist-100"
            :class="project.isFlagship ? 'text-2xl sm:text-3xl' : 'text-xl'"
          >
            {{ project.title }}
          </h3>
          <p class="mt-1.5 text-sm text-slate-500 dark:text-mist-400">{{ project.role }}</p>
          <p
            class="mt-4 leading-relaxed text-pretty text-slate-600 dark:text-mist-300"
            :class="project.isFlagship ? 'text-base' : 'text-sm'"
          >
            {{ project.summary }}
          </p>

          <!-- Tech stack preview -->
          <ul class="mt-auto flex flex-wrap gap-1.5 pt-6">
            <li v-for="tag in visibleTags" :key="tag"><ProjectBadge :text="tag" /></li>
            <li v-if="hiddenTagCount > 0">
              <ProjectBadge :text="`+${hiddenTagCount} ${t.moreTags}`" variant="neutral" />
            </li>
          </ul>
        </div>

        <!-- Flagship only: key results preview -->
        <div v-if="project.isFlagship && previewHighlights.length" class="hidden lg:block">
          <p class="mb-4 eyebrow text-2xs text-slate-400! dark:text-mist-400!">
            {{ t.highlightsTitle }}
          </p>
          <ul class="space-y-3">
            <li
              v-for="highlight in previewHighlights"
              :key="highlight"
              class="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-600 dark:border-white/6 dark:bg-white/3 dark:text-mist-300"
            >
              <span
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              >
                <Check class="h-3 w-3" :stroke-width="3" />
              </span>
              {{ highlight }}
            </li>
          </ul>
        </div>
      </div>

      <footer
        class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 px-6 py-3.5 sm:px-8 dark:border-white/6"
      >
        <button
          type="button"
          class="group/btn inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-medium text-slate-900 focus-ring dark:text-mist-100"
          :aria-label="`${t.openDetailsAria} ${project.title}`"
          aria-haspopup="dialog"
          @click="openDetails"
        >
          {{ t.openDetails }}
          <ArrowRight
            class="h-4 w-4 text-brand-600 transition-transform duration-300 ease-out-expo group-hover:translate-x-1 dark:text-brand-300"
            aria-hidden="true"
          />
        </button>
        <ProjectLinks :project="project" />
      </footer>
    </article>
  </div>
</template>
