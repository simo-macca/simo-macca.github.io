<script setup>
import ProjectCard from './ProjectCard.vue'

defineProps({
  projects: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div
    v-if="projects.length > 0"
    class="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
  >
    <ProjectCard
      v-for="(project, index) in projects"
      :key="project.id"
      :project="project"
      v-motion-slide-up
      :delay="(index % 3) * 100"
    />
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800"
  >
    <p class="text-sm text-slate-500 dark:text-slate-400">No projects found in this category.</p>
  </div>
</template>
