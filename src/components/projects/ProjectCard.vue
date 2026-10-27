<script setup>
import { ArrowUpRight, ChevronDown, ExternalLink, FileText, Sparkles } from '@lucide/vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import ProjectBadge from './ProjectBadge.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle'])

const handleMobileCardClick = (event) => {
  // Only trigger card-level toggle on mobile viewports (< 768px)
  if (typeof window !== 'undefined' && window.innerWidth >= 768) return

  // Prevent toggle when clicking external anchor links
  if (event.target.closest('a')) return

  // Prevent toggle when clicking buttons that already manage their own action
  if (event.target.closest('button')) return

  emit('toggle')
}

const handleKeyToggle = () => {
  emit('toggle')
}
</script>

<template>
  <article
    :id="`project-${project.id}`"
    class="group relative flex h-full cursor-pointer scroll-mt-20 flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl sm:scroll-mt-24 md:cursor-default md:hover:-translate-y-1"
    :class="[
      project.isFlagship
        ? 'border-sky-500/40 bg-white/95 shadow-md shadow-sky-500/5 dark:border-sky-400/30 dark:bg-[#111827]/90 dark:shadow-sky-950/20'
        : 'border-slate-200/80 bg-white/90 shadow-xs dark:border-white/8 dark:bg-[#111827]/80',
      isExpanded
        ? 'shadow-lg ring-2 ring-sky-500/40 dark:shadow-sky-950/40 dark:ring-sky-400/30'
        : '',
    ]"
    @click="handleMobileCardClick"
  >
    <!-- Top accent highlight for flagship projects -->
    <div
      v-if="project.isFlagship"
      class="h-1.5 w-full bg-linear-to-r from-sky-400 via-indigo-500 to-cyan-400"
      aria-hidden="true"
    />

    <div class="flex grow flex-col p-6 sm:p-7">
      <!-- Badges row: Domain & Role/Context -->
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <!-- Domain Badge -->
        <span
          class="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-100/90 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-slate-700 dark:border-white/8 dark:bg-[#1F2937] dark:text-[#F3F4F6]"
        >
          {{ project.domain }}
        </span>

        <!-- Flagship Badge -->
        <span
          v-if="project.isFlagship"
          class="inline-flex items-center gap-1 rounded-md border border-sky-400/40 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700 dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300"
        >
          <Sparkles class="h-3 w-3" aria-hidden="true" />
          Flagship Project
        </span>

        <!-- Context Badge -->
        <span
          v-else-if="project.contextBadge"
          class="inline-flex items-center rounded-md border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-white/6 dark:bg-[#1F2937]/60 dark:text-[#9CA3AF]"
        >
          {{ project.contextBadge }}
        </span>

        <!-- Neutral No Source Code Pill -->
        <ProjectBadge v-if="project.noSourceCode" text="No Source Code" variant="neutral" />
      </div>

      <!-- Project Title & Role -->
      <div class="mb-3">
        <h3
          class="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-600 sm:text-2xl dark:text-[#F3F4F6] dark:group-hover:text-sky-400"
        >
          {{ project.title }}
        </h3>
        <p class="mt-1 text-xs font-medium tracking-wide text-sky-700 dark:text-sky-400">
          Role:
          <span class="font-semibold text-slate-700 dark:text-[#9CA3AF]">{{ project.role }}</span>
        </p>
      </div>

      <!-- Project Summary Preview (Preview State) -->
      <p class="my-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-[#9CA3AF]">
        {{ project.summary || project.challenge }}
      </p>

      <!-- Expandable Deep Dive: Technical Challenge & Architecture via CSS Grid Transition -->
      <div
        class="grid transition-all duration-300 ease-in-out"
        :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
      >
        <div data-project-collapsible class="overflow-hidden">
          <div
            class="space-y-3.5 border-t border-slate-100 pt-3.5 pb-1 text-sm leading-relaxed text-slate-600 dark:border-white/6 dark:text-[#9CA3AF]"
          >
            <!-- Technical Challenge -->
            <div>
              <h4
                class="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-[#F3F4F6]"
              >
                Technical Challenge
              </h4>
              <p class="mt-1 text-xs leading-relaxed sm:text-sm">
                {{ project.challenge }}
              </p>
            </div>

            <!-- Architecture & Key Decisions -->
            <div>
              <h4
                class="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-[#F3F4F6]"
              >
                Architecture &amp; Key Decisions
              </h4>
              <p class="mt-1 text-xs leading-relaxed sm:text-sm">
                {{ project.architecture }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Single Consolidated Toggle Control -->
      <div class="pt-2">
        <button
          type="button"
          class="inline-flex cursor-pointer items-center gap-1.5 rounded-lg py-1 text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-sky-400 dark:hover:text-sky-300"
          :aria-expanded="isExpanded"
          :aria-label="
            isExpanded
              ? `Show less details for ${project.title}`
              : `Read more details for ${project.title}`
          "
          @click.stop="$emit('toggle')"
          @keydown.enter.prevent="handleKeyToggle"
          @keydown.space.prevent="handleKeyToggle"
        >
          <span>{{ isExpanded ? 'Show less' : 'Read more details' }}</span>
          <ChevronDown
            class="h-3.5 w-3.5 transition-transform duration-300 ease-in-out"
            :class="{ 'rotate-180': isExpanded }"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Tech Stack Badges (font-mono, py-1 px-2.5) -->
      <div class="mt-auto pt-4">
        <div class="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
          <ProjectBadge v-for="tag in project.tags || project.techStack" :key="tag" :text="tag" />
        </div>
      </div>
    </div>

    <!-- Actionable Links Footer (margin-top: auto) -->
    <div
      class="mt-auto flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-6 py-3.5 dark:border-white/8 dark:bg-[#0B0F17]/60"
    >
      <div class="flex items-center gap-3">
        <!-- GitHub Link -->
        <a
          v-if="project.links?.github || project.githubUrl"
          :href="project.links?.github || project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none dark:text-[#9CA3AF] dark:hover:text-[#F3F4F6]"
          :aria-label="`View source code for ${project.title} on GitHub`"
          @click.stop
        >
          <GitHubIcon class="h-4 w-4" />
          <span>Source Code</span>
          <ArrowUpRight class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </a>

        <!-- Neutral No Source Code Pill if no GitHub URL -->
        <span
          v-else-if="project.noSourceCode"
          class="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-xs font-medium text-slate-500 dark:border-white/8 dark:bg-white/4 dark:text-slate-400"
        >
          No Source Code
        </span>
      </div>

      <!-- Action Button: Read Thesis (PDF) or Live Demo -->
      <div class="flex items-center gap-2">
        <a
          v-if="project.links?.pdf || project.pdfUrl"
          :href="project.links?.pdf || project.pdfUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-sky-500 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 dark:bg-sky-500 dark:hover:bg-sky-400"
          :aria-label="`Read Thesis PDF for ${project.title}`"
          @click.stop
        >
          <FileText class="h-3.5 w-3.5" aria-hidden="true" />
          <span>Read Thesis (PDF)</span>
        </a>

        <a
          v-if="project.links?.demo || project.liveUrl"
          :href="project.links?.demo || project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-sky-500 hover:shadow-xs focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none active:scale-95 dark:bg-sky-500 dark:hover:bg-sky-400"
          :aria-label="`Open live deployment for ${project.title}`"
          @click.stop
        >
          <span>Live Demo</span>
          <ExternalLink class="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>
</template>
