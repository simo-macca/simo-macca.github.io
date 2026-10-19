<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore.js'
import AboutView from '@/views/AboutView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import HomeView from '@/views/HomeView.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="relative">
    <!-- Ambient background glow -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-125 overflow-hidden opacity-50 blur-3xl dark:opacity-25"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%)] aspect-1155/678 w-160 -translate-x-1/2 rotate-30 bg-linear-to-tr from-sky-400 via-indigo-400 to-cyan-300 sm:left-[calc(50%)] sm:w-272"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>

    <header
      class="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-50/80 backdrop-blur-md transition-colors duration-300 dark:border-white/8 dark:bg-[#0B0F17]/85"
    >
      <NavbarComponent />
    </header>

    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <HomeView />
      <AboutView id="about" />
      <SkillsView id="skills" />
      <ProjectsView id="projects" />
      <ContactView id="contact" />
    </main>

    <FooterComponent />
  </div>
</template>
