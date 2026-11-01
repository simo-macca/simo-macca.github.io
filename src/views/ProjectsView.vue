<script setup>
import { computed, ref } from 'vue'
import { getProjects, getProjectCategories } from '@/data/projects.js'
import ProjectFilterTabs from '@/components/projects/ProjectFilterTabs.vue'
import ProjectGrid from '@/components/projects/ProjectGrid.vue'
import { useLanguageStore } from '@/stores/LanguageStore.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.projects)
const activeFilter = ref('all')

const localizedCategories = computed(() => getProjectCategories(languageStore.currentLanguage))
const localizedProjects = computed(() => getProjects(languageStore.currentLanguage))

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return localizedProjects.value
  return localizedProjects.value.filter((p) => p.category === activeFilter.value)
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
          {{ t.sectionTitle }}
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          {{ t.sectionSubtitle }}
        </p>

        <!-- Category Filter Tabs Component -->
        <div class="mt-8">
          <ProjectFilterTabs v-model="activeFilter" :categories="localizedCategories" />
        </div>
      </div>

      <!-- Projects Grid Component -->
      <ProjectGrid :projects="filteredProjects" />
    </div>
  </section>
</template>
