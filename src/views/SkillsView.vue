<script setup>
import { computed } from 'vue'
import TechCardComponent from '@/components/TechCardComponent.vue'
import { getSkillCategories } from '@/data/skills.js'
import { useLanguageStore } from '@/stores/LanguageStore.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.skills)
const localizedCategories = computed(() => getSkillCategories(languageStore.currentLanguage))
</script>

<template>
  <section class="py-20" aria-label="Skills and technical capabilities section">
    <div class="mx-auto max-w-6xl">
      <div class="mb-14 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          {{ t.sectionTitle }}
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          {{ t.sectionSubtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TechCardComponent
          v-for="(cat, index) in localizedCategories"
          :key="cat.id"
          :topic="cat.topic"
          :description="cat.description"
          :skills="cat.skills"
          :categoryIcon="cat.categoryIcon"
          v-motion-slide-up
          :delay="index * 100"
        />
      </div>
    </div>
  </section>
</template>
