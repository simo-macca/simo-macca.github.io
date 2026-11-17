<script setup>
import ProjectCard from '@/components/projects/ProjectCard.vue'

/**
 * Two-column bento grid; the flagship project spans the full width.
 * Cards reveal on scroll and re-flow smoothly when the filter changes.
 */
defineProps({
  projects: {
    type: Array,
    required: true,
  },
  emptyLabel: {
    type: String,
    required: true,
  },
})

defineEmits(['open'])

/**
 * A leaving card is taken out of the grid flow (`position: absolute`); pin its
 * current box first so it fades out in place instead of collapsing.
 */
function pinLeavingCard(el) {
  el.style.left = `${el.offsetLeft}px`
  el.style.top = `${el.offsetTop}px`
  el.style.width = `${el.offsetWidth}px`
  el.style.height = `${el.offsetHeight}px`
}
</script>

<template>
  <TransitionGroup
    v-if="projects.length > 0"
    tag="ul"
    class="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
    name="project-grid"
    @before-leave="pinLeavingCard"
  >
    <li
      v-for="(project, index) in projects"
      :key="project.id"
      :class="{ 'md:col-span-2': project.isFlagship }"
    >
      <!-- Scroll-reveal lives on an inner wrapper so it does not fight the filter transition -->
      <div v-reveal="(index % 2) * 100" class="h-full">
        <ProjectCard :project="project" @open="$emit('open', $event)" />
      </div>
    </li>
  </TransitionGroup>

  <div
    v-else
    class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-white/10"
  >
    <p class="text-sm text-slate-500 dark:text-mist-400">{{ emptyLabel }}</p>
  </div>
</template>

<style scoped>
/*
 * Filter animations. Plain CSS (not utility classes) so the move and leave
 * transitions can never be merged on the same element: a card that is still
 * gliding from a previous filter change must fade out, not snap away.
 */
.project-grid-move {
  transition: transform 700ms var(--ease-out-expo);
}

.project-grid-enter-active {
  transition:
    opacity 500ms var(--ease-out-expo),
    transform 500ms var(--ease-out-expo);
}

.project-grid-leave-active {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  transition:
    opacity 250ms ease-in,
    transform 250ms ease-in;
}

.project-grid-enter-from,
.project-grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
