<script setup>
import { computed } from 'vue'
import { ArrowUpRight, ExternalLink, FileText, Lock } from '@lucide/vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import { useLanguageStore } from '@/stores/language.js'

/** Source / live demo / thesis links of a project, shared by the card and the dialog. */
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'md'].includes(value),
  },
})

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)
const newTab = computed(() => languageStore.t.a11y.opensInNewTab)

const buttonSize = computed(() =>
  props.size === 'md' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs',
)
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <a
      v-if="project.links.github"
      :href="project.links.github"
      target="_blank"
      rel="noopener noreferrer"
      class="group/link inline-flex items-center gap-1.5 rounded-lg font-semibold text-slate-700 focus-ring transition-colors hover:text-sky-600 dark:text-mist-400 dark:hover:text-mist-100"
      :class="buttonSize"
      :aria-label="`${t.sourceCodeAria} ${project.title} ${newTab}`"
    >
      <GitHubIcon class="h-4 w-4" />
      <span>{{ t.sourceCode }}</span>
      <ArrowUpRight
        class="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>

    <span
      v-else
      class="inline-flex items-center gap-1.5 rounded-lg font-medium text-slate-500 dark:text-slate-400"
      :class="buttonSize"
      :title="t.privateCodeHint"
    >
      <Lock class="h-3.5 w-3.5" aria-hidden="true" />
      {{ t.privateCode }}
    </span>

    <a
      v-if="project.links.pdf"
      :href="project.links.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-primary"
      :class="buttonSize"
      :aria-label="`${t.readThesisAria} ${project.title} ${newTab}`"
    >
      <FileText class="h-3.5 w-3.5" aria-hidden="true" />
      <span>{{ t.readThesis }}</span>
    </a>

    <a
      v-if="project.links.demo"
      :href="project.links.demo"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-primary"
      :class="buttonSize"
      :aria-label="`${t.liveDemoAria} ${project.title} ${newTab}`"
    >
      <span>{{ t.liveDemo }}</span>
      <ExternalLink class="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  </div>
</template>
