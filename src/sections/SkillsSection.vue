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
  <section class="py-24 sm:py-32" aria-labelledby="skills-title">
    <SectionHeader
      heading-id="skills-title"
      :index="2"
      :eyebrow="t.eyebrow"
      :title="t.sectionTitle"
      :subtitle="t.sectionSubtitle"
    />

    <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
      <!-- The reveal lives on the <li> so it never touches the card's own hover transitions -->
      <li v-for="(category, index) in categories" :key="category.id" v-reveal="(index % 2) * 100">
        <SkillCard
          :index="index + 1"
          :topic="category.topic"
          :description="category.description"
          :skills="category.skills"
          :icon="category.icon"
        />
      </li>
    </ul>
  </section>
</template>
