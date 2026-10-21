<script setup>
import { ref, watch } from 'vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

// Exclusive accordion state: tracks active card ID
const activeCardId = ref(null)

const handleToggle = (id) => {
  activeCardId.value = activeCardId.value === id ? null : id
}

// Automatically collapse if the currently expanded project is filtered out
watch(
  () => props.projects,
  (newProjects) => {
    if (activeCardId.value && !newProjects.some((p) => p.id === activeCardId.value)) {
      activeCardId.value = null
    }
  },
)
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
      :is-expanded="activeCardId === project.id"
      v-motion-slide-up
      :delay="(index % 3) * 100"
      @toggle="handleToggle(project.id)"
    />
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800"
  >
    <p class="text-sm text-slate-500 dark:text-slate-400">No projects found in this category.</p>
  </div>
</template>
