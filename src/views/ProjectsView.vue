<script setup>
import { computed, ref } from 'vue'
import { projects, projectCategories } from '@/data/projects.js'
import ProjectFilterTabs from '@/components/projects/ProjectFilterTabs.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'

const activeFilter = ref('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => p.category === activeFilter.value)
})
</script>

<template>
  <section class="py-20" aria-label="Projects and Engineering Case Studies">
    <div class="mx-auto max-w-7xl">
      <!-- Section Title & Narrative -->
      <div class="mb-10 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          Engineering Case Studies
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          A curated portfolio of systems architectures, algorithmic solvers, information retrieval
          engines, and reactive applications.
        </p>

        <!-- Category Filter Tabs Component -->
        <div class="mt-8">
          <ProjectFilterTabs v-model="activeFilter" :categories="projectCategories" />
        </div>
      </div>

      <!-- Projects Grid Component -->
      <ProjectGrid :projects="filteredProjects" />
    </div>
  </section>
</template>
