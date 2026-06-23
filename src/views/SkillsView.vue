<script setup>
import TechCardComponent from '@/components/TechCardComponent.vue'

const data = [
  {
    topic: 'Frontend',
    skills: [
      'Vue.js',
      'Vue Router',
      'HTML & CSS',
      'JavaScript',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive Design',
    ],
  },
  {
    topic: 'Backend',
    skills: ['Spring Boot', 'Django', 'REST APIs', 'PostgreSQL', 'MySQL', 'JWT Authentication'],
  },
  {
    topic: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C/C++', 'Racket', 'SQL'],
  },
  {
    topic: 'Tools & DevOps',
    skills: ['Git & GitHub', 'Docker', 'Maven & Gradle', 'CI/CD Pipelines', 'Figma'],
  },
  {
    topic: 'Libraries & Other',
    skills: ['Pandas', 'Celery', 'Ollama (AI)', 'Vitest', 'Microsoft Office'],
  },
]
</script>

<template>
  <section class="mt-25 flex min-h-dvh flex-col items-center justify-center gap-4 sm:pt-16">
    <div class="mx-auto max-w-6xl">
      <h2
        class="mb-16 text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
        v-motion-fade-in
      >
        My Tech Stack
      </h2>

      <div class="grid grid-cols-12 gap-6">
        <TechCardComponent
          v-for="(d, index) in data"
          :key="d.topic"
          v-bind="d"
          :index="index"
          v-motion-slide-up
          :delay="index * 75"
        />
      </div>
    </div>
  </section>
</template>
