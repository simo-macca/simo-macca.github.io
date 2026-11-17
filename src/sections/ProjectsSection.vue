<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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

/*
 * Deep links: `#project-<id>` opens that project's dialog (handy for links in a
 * CV or an email). Opening a dialog writes the hash, closing it restores
 * `#projects`; `replaceState` never adds history entries or scrolls the page.
 */
const HASH_PREFIX = '#project-'

function openFromHash() {
  const { hash } = window.location
  if (!hash.startsWith(HASH_PREFIX)) return
  const id = decodeURIComponent(hash.slice(HASH_PREFIX.length))
  if (projects.some((project) => project.id === id)) selectedProjectId.value = id
}

function openProject(id) {
  selectedProjectId.value = id
  history.replaceState(history.state, '', `${HASH_PREFIX}${id}`)
}

function closeProject() {
  selectedProjectId.value = null
  if (window.location.hash.startsWith(HASH_PREFIX)) {
    history.replaceState(history.state, '', '#projects')
  }
}

onMounted(() => {
  openFromHash()
  window.addEventListener('hashchange', openFromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', openFromHash))
</script>

<template>
  <section class="py-24 sm:py-32" aria-labelledby="projects-title">
    <SectionHeader
      heading-id="projects-title"
      :index="3"
      :eyebrow="t.eyebrow"
      :title="t.sectionTitle"
      :subtitle="t.sectionSubtitle"
    />

    <div v-reveal class="mb-8">
      <ProjectFilterTabs v-model="activeFilter" :options="filterOptions" :label="t.filterLabel" />
    </div>

    <ProjectGrid :projects="filteredProjects" :empty-label="t.emptyState" @open="openProject" />

    <ProjectDetailsDialog :project="selectedProject" @close="closeProject" />
  </section>
</template>
