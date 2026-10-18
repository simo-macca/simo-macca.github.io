<script setup>
import { ArrowUpRight, ExternalLink, FileText, Sparkles } from '@lucide/vue'
import ProjectBadge from './ProjectBadge.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article
    class="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    :class="[
      project.isFlagship
        ? 'border-sky-500/40 bg-white/95 shadow-md shadow-sky-500/5 dark:border-sky-400/30 dark:bg-[#111827]/90 dark:shadow-sky-950/20'
        : 'border-slate-200/80 bg-white/90 shadow-xs dark:border-white/[0.08] dark:bg-[#111827]/80',
    ]"
  >
    <!-- Top accent highlight for flagship projects -->
    <div
      v-if="project.isFlagship"
      class="h-1.5 w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400"
      aria-hidden="true"
    />

    <div class="flex grow flex-col p-6 sm:p-7">
      <!-- Badges row: Domain & Role/Context -->
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <!-- Domain Badge -->
        <span
          class="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-100/90 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-slate-700 dark:border-white/[0.08] dark:bg-[#1F2937] dark:text-[#F3F4F6]"
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
          class="inline-flex items-center rounded-md border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-white/[0.06] dark:bg-[#1F2937]/60 dark:text-[#9CA3AF]"
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

      <!-- Technical Problem & Architectural Decisions -->
      <div class="my-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
        <div>
          <h4 class="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-[#F3F4F6]">
            Technical Challenge
          </h4>
          <p class="mt-1 text-xs leading-relaxed sm:text-sm">
            {{ project.challenge }}
          </p>
        </div>

        <div>
          <h4 class="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-[#F3F4F6]">
            Architecture &amp; Key Decisions
          </h4>
          <p class="mt-1 text-xs leading-relaxed sm:text-sm">
            {{ project.architecture }}
          </p>
        </div>
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
      class="mt-auto flex items-center justify-between border-t border-slate-200/80 bg-slate-50/70 px-6 py-3.5 dark:border-white/[0.08] dark:bg-[#0B0F17]/60"
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
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.09 2.91.83.091-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.64-.33 2.5-.33.86 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.33 4.68-4.56 4.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.28 0 .27.18.58.69.48C21.137 20.165 24 16.418 24 12c0-5.523-4.477-10-10-10z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Source Code</span>
          <ArrowUpRight class="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
        </a>

        <!-- Neutral No Source Code Pill if no GitHub URL -->
        <span
          v-else-if="project.noSourceCode"
          class="inline-flex items-center rounded-md border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-xs font-medium text-slate-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-400"
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
        >
          <span>Live Demo</span>
          <ExternalLink class="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>
</template>
