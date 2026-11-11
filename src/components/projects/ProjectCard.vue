<script setup>
import { computed } from 'vue'
import { ArrowRight, Sparkles } from '@lucide/vue'
import ProjectBadge from '@/components/projects/ProjectBadge.vue'
import ProjectLinks from '@/components/projects/ProjectLinks.vue'
import { useSpotlight } from '@/composables/useSpotlight.js'
import { useLanguageStore } from '@/stores/language.js'

/**
 * Compact project preview. The full details open in `ProjectDetailsDialog`
 * via the "Details" button or by clicking any non-interactive part of the
 * card. Behaviour is identical on mobile and desktop and never shifts the grid.
 */
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open'])

const MAX_VISIBLE_TAGS = 5

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)
const { onPointerMove } = useSpotlight()

const visibleTags = computed(() => props.project.tags.slice(0, MAX_VISIBLE_TAGS))
const hiddenTagCount = computed(() => Math.max(0, props.project.tags.length - MAX_VISIBLE_TAGS))

const openDetails = () => emit('open', props.project.id)

/** Clicks on the card surface open the dialog; links and buttons keep their own action. */
const onCardClick = (event) => {
  if (event.target.closest('a, button')) return
  openDetails()
}
</script>

<template>
  <article
    :id="`project-${project.id}`"
    class="group spotlight flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    :class="
      project.isFlagship
        ? 'border-sky-500/40 bg-white/95 shadow-md shadow-sky-500/5 dark:border-sky-400/30 dark:bg-night-900/90 dark:shadow-sky-950/20'
        : 'border-slate-200/80 bg-white/90 shadow-xs hover:border-sky-400/40 dark:border-white/8 dark:bg-night-900/80 dark:hover:border-sky-500/30'
    "
    @click="onCardClick"
    @pointermove="onPointerMove"
  >
    <div
      v-if="project.isFlagship"
      class="h-1.5 w-full animate-gradient-pan bg-linear-to-r from-sky-400 via-indigo-500 to-cyan-400 bg-size-[200%_auto]"
      aria-hidden="true"
    />

    <div class="flex grow flex-col p-6 sm:p-7">
      <!-- Icon + badges -->
      <div class="mb-4 flex items-start gap-3">
        <span
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950/50 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white"
          aria-hidden="true"
        >
          <component :is="project.icon" class="h-5 w-5" />
        </span>
        <div class="flex min-w-0 flex-wrap items-center gap-1.5">
          <span
            class="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-100/90 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:border-white/8 dark:bg-night-800 dark:text-mist-100"
          >
            {{ project.domain }}
          </span>
          <span
            v-if="project.isFlagship"
            class="inline-flex items-center gap-1 rounded-md border border-sky-400/40 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300"
          >
            <Sparkles class="h-3 w-3" aria-hidden="true" />
            {{ t.flagshipBadge }}
          </span>
          <span
            v-else
            class="inline-flex items-center rounded-md border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-white/6 dark:bg-night-800/60 dark:text-mist-400"
          >
            {{ t.contextBadges[project.category] }}
          </span>
        </div>
      </div>

      <!-- Title, role, summary -->
      <h3
        class="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 dark:text-mist-100 dark:group-hover:text-sky-400"
      >
        {{ project.title }}
      </h3>
      <p class="mt-1 text-xs font-semibold tracking-wide text-sky-700 dark:text-sky-400">
        {{ project.role }}
      </p>
      <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-mist-400">
        {{ project.summary }}
      </p>

      <!-- Tech stack preview -->
      <ul class="mt-auto flex flex-wrap gap-1.5 pt-5">
        <li v-for="tag in visibleTags" :key="tag"><ProjectBadge :text="tag" /></li>
        <li v-if="hiddenTagCount > 0">
          <ProjectBadge :text="`+${hiddenTagCount} ${t.moreTags}`" variant="neutral" />
        </li>
      </ul>

      <button
        type="button"
        class="group/btn mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg py-1 text-sm font-semibold text-sky-600 focus-ring transition-colors hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
        :aria-label="`${t.openDetailsAria} ${project.title}`"
        aria-haspopup="dialog"
        @click="openDetails"
      >
        {{ t.openDetails }}
        <ArrowRight
          class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </button>
    </div>

    <footer
      class="border-t border-slate-200/80 bg-slate-50/70 px-4 py-3 sm:px-5 dark:border-white/8 dark:bg-night-950/60"
    >
      <ProjectLinks :project="project" />
    </footer>
  </article>
</template>
