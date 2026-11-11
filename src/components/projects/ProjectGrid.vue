<script setup>
import ProjectCard from '@/components/projects/ProjectCard.vue'

/** Responsive project grid. Cards animate in on scroll and re-flow smoothly when filtered. */
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
</script>

<template>
  <TransitionGroup
    v-if="projects.length > 0"
    tag="ul"
    class="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    move-class="transition-transform duration-500 ease-out"
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="opacity-0 scale-95"
    leave-active-class="absolute transition duration-200 ease-in"
    leave-to-class="opacity-0 scale-95"
  >
    <li v-for="(project, index) in projects" :key="project.id">
      <!-- Scroll-reveal lives on an inner wrapper so it does not fight the filter transition -->
      <div v-motion-slide-up :delay="(index % 3) * 100" class="h-full">
        <ProjectCard :project="project" @open="$emit('open', $event)" />
      </div>
    </li>
  </TransitionGroup>

  <div
    v-else
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800"
  >
    <p class="text-sm text-slate-500 dark:text-slate-400">{{ emptyLabel }}</p>
  </div>
</template>
