<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { CheckCircle2, X } from '@lucide/vue'
import ProjectBadge from '@/components/projects/ProjectBadge.vue'
import ProjectLinks from '@/components/projects/ProjectLinks.vue'
import { useLanguageStore } from '@/stores/language.js'

/**
 * Full project details in a native modal `<dialog>`.
 *
 * The native element gives focus trapping, Escape-to-close, an inert page
 * behind it and focus restoration for free. On small screens it becomes a
 * bottom sheet; on larger screens it is centred.
 */
const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)
const dialogRef = ref(null)

watch(
  () => props.project,
  async (project) => {
    await nextTick()
    const dialog = dialogRef.value
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  },
)

const close = () => dialogRef.value?.close()

/** Clicking the backdrop (the dialog element itself, outside the panel) closes it. */
const onDialogClick = (event) => {
  if (event.target === dialogRef.value) close()
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="project-dialog m-0 mt-auto max-h-[92svh] w-full max-w-none overflow-hidden rounded-t-3xl border border-slate-200/80 bg-white p-0 text-slate-600 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm sm:m-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-3xl dark:border-white/10 dark:bg-night-900 dark:text-mist-400"
    :aria-labelledby="project ? `dialog-title-${project.id}` : undefined"
    @close="emit('close')"
    @click="onDialogClick"
  >
    <div v-if="project" class="flex max-h-[inherit] w-full flex-col">
      <!-- Header -->
      <div
        class="flex items-start gap-4 border-b border-slate-200/80 px-5 pt-5 pb-4 sm:px-7 sm:pt-6 dark:border-white/8"
      >
        <span
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-md shadow-sky-500/20 dark:bg-sky-500"
          aria-hidden="true"
        >
          <component :is="project.icon" class="h-6 w-6" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-semibold tracking-wide text-sky-700 uppercase dark:text-sky-400">
            {{ project.domain }}
          </p>
          <h2
            :id="`dialog-title-${project.id}`"
            class="mt-0.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-mist-100"
          >
            {{ project.title }}
          </h2>
          <p class="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            <span class="font-semibold text-slate-700 dark:text-mist-100">{{ project.role }}</span>
            <span aria-hidden="true"> · </span>
            <span>{{ project.context }}</span>
          </p>
        </div>
        <button
          type="button"
          class="-mt-1 -mr-1 icon-button h-9 w-9 shrink-0"
          :aria-label="t.closeDialog"
          autofocus
          @click="close"
        >
          <X class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <!-- Body -->
      <div
        class="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-6 text-sm leading-relaxed sm:px-7"
      >
        <p class="text-base text-slate-700 dark:text-mist-100">{{ project.summary }}</p>

        <section>
          <h3
            class="mb-1.5 text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-mist-100"
          >
            {{ t.challengeTitle }}
          </h3>
          <p>{{ project.challenge }}</p>
        </section>

        <section>
          <h3
            class="mb-1.5 text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-mist-100"
          >
            {{ t.approachTitle }}
          </h3>
          <p>{{ project.approach }}</p>
        </section>

        <section v-if="project.highlights?.length">
          <h3
            class="mb-2 text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-mist-100"
          >
            {{ t.highlightsTitle }}
          </h3>
          <ul class="grid gap-2 sm:grid-cols-2">
            <li
              v-for="highlight in project.highlights"
              :key="highlight"
              class="flex items-start gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3 dark:border-white/8 dark:bg-night-950/50"
            >
              <CheckCircle2
                class="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h3
            class="mb-2 text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-mist-100"
          >
            {{ t.stackTitle }}
          </h3>
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="tag in project.tags" :key="tag"><ProjectBadge :text="tag" /></li>
          </ul>
        </section>
      </div>

      <!-- Footer -->
      <div
        class="border-t border-slate-200/80 bg-slate-50/70 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6 dark:border-white/8 dark:bg-night-950/60"
      >
        <ProjectLinks :project="project" size="md" />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.project-dialog[open] {
  display: flex;
  animation: var(--animate-dialog-in);
}

.project-dialog[open]::backdrop {
  animation: var(--animate-backdrop-in);
}
</style>
