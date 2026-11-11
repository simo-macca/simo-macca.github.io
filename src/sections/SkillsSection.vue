<script setup>
import { computed } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import SkillCard from '@/components/skills/SkillCard.vue'
import { skillCategories } from '@/data/skills.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.skills)
const categories = computed(() => languageStore.localized(skillCategories))
</script>

<template>
  <section class="py-20" aria-labelledby="skills-title">
    <div class="mx-auto max-w-6xl">
      <SectionHeader
        heading-id="skills-title"
        :eyebrow="t.eyebrow"
        :title="t.sectionTitle"
        :subtitle="t.sectionSubtitle"
      />

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Motion lives on the wrapper so it does not override the card's hover transform -->
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          v-motion-slide-up
          :delay="index * 100"
        >
          <SkillCard
            :topic="category.topic"
            :description="category.description"
            :skills="category.skills"
            :icon="category.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>
