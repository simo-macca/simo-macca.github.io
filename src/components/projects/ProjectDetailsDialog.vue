<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { Check, Link2, X } from '@lucide/vue'
import ProjectBadge from '@/components/projects/ProjectBadge.vue'
import ProjectLinks from '@/components/projects/ProjectLinks.vue'
import { useLanguageStore } from '@/stores/language.js'

/**
 * Full project details in a native modal `<dialog>`.
 *
 * The native element gives focus trapping, Escape-to-close, an inert page
 * behind it and focus restoration for free. On small screens it is a bottom
 * sheet; on larger screens it is centred. Opening and closing are animated in
 * CSS (`@starting-style` + `allow-discrete`); the last project stays rendered
 * while the closing animation plays.
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

// Keeps the content visible during the close animation.
const displayed = ref(null)

watch(
  () => props.project,
  async (project) => {
    if (project) displayed.value = project
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

const { copy, copied, isSupported: canCopy } = useClipboard({ copiedDuring: 2000 })

function copyLink() {
  if (!displayed.value) return
  const { origin, pathname } = window.location
  copy(`${origin}${pathname}#project-${displayed.value.id}`)
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="project-dialog m-0 mt-auto max-h-[92svh] w-full max-w-none overflow-hidden rounded-t-4xl border border-slate-200/80 bg-white p-0 text-slate-600 shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-md sm:m-auto sm:max-h-[86vh] sm:max-w-3xl sm:rounded-4xl dark:border-white/10 dark:bg-night-900 dark:text-mist-400"
    :aria-labelledby="displayed ? `dialog-title-${displayed.id}` : undefined"
    @close="emit('close')"
    @click="onDialogClick"
  >
    <div v-if="displayed" class="flex max-h-[inherit] w-full flex-col">
      <!-- Grab handle (bottom sheet affordance on phones) -->
      <span
        class="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-slate-300 sm:hidden dark:bg-white/15"
        aria-hidden="true"
      />

      <!-- Header -->
      <div class="flex items-start gap-4 px-6 pt-5 pb-5 sm:px-9 sm:pt-8">
        <span
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-500/25 dark:bg-brand-500"
          aria-hidden="true"
        >
          <component :is="displayed.icon" class="h-6 w-6" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="eyebrow text-2xs tracking-widest">{{ displayed.domain }}</p>
          <h2
            :id="`dialog-title-${displayed.id}`"
            class="mt-1 text-2xl font-semibold tracking-tight text-balance text-slate-900 sm:text-3xl dark:text-mist-100"
          >
            {{ displayed.title }}
          </h2>
          <p class="mt-1.5 text-sm text-slate-500 dark:text-mist-400">
            <span class="font-medium text-slate-700 dark:text-mist-300">{{ displayed.role }}</span>
            <span aria-hidden="true"> · </span>
            <span>{{ displayed.context }}</span>
          </p>
        </div>
        <button
          type="button"
          class="-mt-1 -mr-2 icon-button shrink-0"
          :aria-label="t.closeDialog"
          autofocus
          @click="close"
        >
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <!-- Body -->
      <div
        class="min-h-0 flex-1 space-y-8 overflow-y-auto overscroll-contain border-t border-slate-200/70 px-6 py-7 text-base leading-relaxed sm:px-9 dark:border-white/7"
      >
        <p class="text-lg leading-relaxed text-pretty text-slate-800 dark:text-mist-100">
          {{ displayed.summary }}
        </p>

        <div class="grid gap-8 sm:grid-cols-2">
          <section>
            <h3 class="mb-2 eyebrow text-2xs text-slate-400! dark:text-mist-400!">
              {{ t.challengeTitle }}
            </h3>
            <p class="text-pretty">{{ displayed.challenge }}</p>
          </section>

          <section>
            <h3 class="mb-2 eyebrow text-2xs text-slate-400! dark:text-mist-400!">
              {{ t.approachTitle }}
            </h3>
            <p class="text-pretty">{{ displayed.approach }}</p>
          </section>
        </div>

        <section v-if="displayed.highlights?.length">
          <h3 class="mb-3 eyebrow text-2xs text-slate-400! dark:text-mist-400!">
            {{ t.highlightsTitle }}
          </h3>
          <ul class="grid gap-2.5 sm:grid-cols-2">
            <li
              v-for="highlight in displayed.highlights"
              :key="highlight"
              class="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm dark:border-white/6 dark:bg-white/3"
            >
              <span
                class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              >
                <Check class="h-3 w-3" :stroke-width="3" />
              </span>
              <span>{{ highlight }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 class="mb-3 eyebrow text-2xs text-slate-400! dark:text-mist-400!">
            {{ t.stackTitle }}
          </h3>
          <ul class="flex flex-wrap gap-1.5">
            <li v-for="tag in displayed.tags" :key="tag"><ProjectBadge :text="tag" /></li>
          </ul>
        </section>
      </div>

      <!-- Footer -->
      <div
        class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 bg-slate-50/60 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-9 dark:border-white/7 dark:bg-night-950/40"
      >
        <ProjectLinks :project="displayed" size="md" />
        <button
          v-if="canCopy"
          type="button"
          class="btn-secondary h-10 px-4 text-sm"
          :aria-label="t.copyLinkAria"
          @click="copyLink"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-75"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 scale-75"
          >
            <Check v-if="copied" key="done" class="h-4 w-4 text-emerald-500" aria-hidden="true" />
            <Link2 v-else key="link" class="h-4 w-4" aria-hidden="true" />
          </Transition>
          <span aria-live="polite">{{ copied ? t.linkCopied : t.copyLink }}</span>
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
/* Open/close animation. Browsers without @starting-style simply skip it. */
.project-dialog {
  opacity: 0;
  transform: translateY(100%);
  transition:
    opacity 300ms ease,
    transform 500ms var(--ease-out-expo),
    overlay 500ms allow-discrete,
    display 500ms allow-discrete;
}

.project-dialog[open] {
  display: flex;
  opacity: 1;
  transform: none;
}

@starting-style {
  .project-dialog[open] {
    opacity: 0;
    transform: translateY(100%);
  }
}

@media (min-width: 640px) {
  .project-dialog {
    transform: translateY(24px) scale(0.97);
  }

  .project-dialog[open] {
    transform: none;
  }

  @starting-style {
    .project-dialog[open] {
      transform: translateY(24px) scale(0.97);
    }
  }
}

.project-dialog::backdrop {
  opacity: 0;
  transition:
    opacity 400ms ease,
    overlay 500ms allow-discrete,
    display 500ms allow-discrete;
}

.project-dialog[open]::backdrop {
  opacity: 1;
}

@starting-style {
  .project-dialog[open]::backdrop {
    opacity: 0;
  }
}
</style>
