<script setup>
import { computed, ref } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ProjectDetailsDialog from '@/components/projects/ProjectDetailsDialog.vue'
import ProjectFilterTabs from '@/components/projects/ProjectFilterTabs.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'
import { projectCategoryIds, projects } from '@/data/projects.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)

const activeFilter = ref('all')
const selectedProjectId = ref(null)

const localizedProjects = computed(() => languageStore.localized(projects))

const filterOptions = computed(() =>
  projectCategoryIds
    .map((id) => ({
      id,
      label: t.value.categories[id],
      count:
        id === 'all'
          ? localizedProjects.value.length
          : localizedProjects.value.filter((project) => project.category === id).length,
    }))
    .filter((option) => option.count > 0),
)

const filteredProjects = computed(() =>
  activeFilter.value === 'all'
    ? localizedProjects.value
    : localizedProjects.value.filter((project) => project.category === activeFilter.value),
)

// Looked up by id so the open dialog follows language changes.
const selectedProject = computed(
  () => localizedProjects.value.find((project) => project.id === selectedProjectId.value) ?? null,
)
</script>

<template>
  <section class="py-20" aria-labelledby="projects-title">
    <div class="mx-auto max-w-7xl">
      <SectionHeader
        heading-id="projects-title"
        :eyebrow="t.eyebrow"
        :title="t.sectionTitle"
        :subtitle="t.sectionSubtitle"
      />

      <div class="-mt-4 mb-10" v-motion-fade-in>
        <ProjectFilterTabs v-model="activeFilter" :options="filterOptions" :label="t.filterLabel" />
      </div>

      <ProjectGrid
        :projects="filteredProjects"
        :empty-label="t.emptyState"
        @open="selectedProjectId = $event"
      />
    </div>

    <ProjectDetailsDialog :project="selectedProject" @close="selectedProjectId = null" />
  </section>
</template>
