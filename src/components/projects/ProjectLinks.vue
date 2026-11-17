<script setup>
import { computed } from 'vue'
import { ArrowUpRight, FileText, Lock } from '@lucide/vue'
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

const sizeClasses = computed(() => (props.size === 'md' ? 'h-10 px-4 text-sm' : 'h-8 px-3 text-xs'))
</script>

<template>
  <div class="flex flex-wrap items-center gap-1.5">
    <a
      v-if="project.links.github"
      :href="project.links.github"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-secondary"
      :class="sizeClasses"
      :aria-label="`${t.sourceCodeAria} ${project.title} ${newTab}`"
    >
      <GitHubIcon class="h-3.5 w-3.5" />
      <span>{{ t.sourceCode }}</span>
    </a>

    <span
      v-else
      class="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 font-medium text-slate-500 dark:border-white/12 dark:text-mist-400"
      :class="sizeClasses"
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
      :class="sizeClasses"
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
      class="group/demo btn-primary"
      :class="sizeClasses"
      :aria-label="`${t.liveDemoAria} ${project.title} ${newTab}`"
    >
      <span>{{ t.liveDemo }}</span>
      <ArrowUpRight
        class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  </div>
</template>
