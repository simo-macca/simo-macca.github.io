<script setup>
import AmbientBackground from '@/components/layout/AmbientBackground.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import BackToTop from '@/components/common/BackToTop.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
</script>

<template>
  <!-- overflow-x-clip hides off-screen entrance offsets without breaking the sticky header -->
  <div class="relative isolate overflow-x-clip">
    <a
      href="#main-content"
      class="sr-only z-60 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {{ languageStore.t.a11y.skipToContent }}
    </a>

    <AmbientBackground />

    <AppHeader />

    <main id="main-content" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" tabindex="-1">
      <HeroSection id="home" />
      <AboutSection id="about" />
      <SkillsSection id="skills" />
      <ProjectsSection id="projects" />
      <ContactSection id="contact" />
    </main>

    <AppFooter />
    <BackToTop />
  </div>
</template>
