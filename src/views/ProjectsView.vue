<script setup>
import ProjectCard from '@/components/ProjectCard.vue'

const projects = [
  {
    title: 'Functional Snake',
    subtitle: 'Academic Project',
    description:
      'A collaborative implementation of the classic Snake game. Engineered entirely using functional programming paradigms with comprehensive documentation.',
    techStack: ['Racket'],
    link: 'https://github.com/simo-macca/snake-racket',
  },
  {
    title: 'Battleship',
    subtitle: 'Object-Oriented Architecture',
    description:
      'A classic Battleship game implemented in Java, heavily utilizing advanced design patterns like the State Pattern to maintain robust game logic and UI separation.',
    techStack: ['Java', 'Gradle', 'JUnit'],
    link: 'https://github.com/simo-macca/battleship',
  },
  {
    title: 'SEWorld',
    subtitle: 'Software Engineering Educational Platform',
    description:
      'A full-stack web application designed for software engineering education, enabling comprehensive topic and exercise management.',
    techStack: ['Vue.js', 'Java', 'Spring Boot'],
    link: 'https://github.com/simo-macca/SEWorld',
  },
  {
    title: 'Meme Search Engine',
    subtitle: 'Information Retrieval System',
    description:
      'A web scraping and search engine pipeline utilizing Solr to index, query, and rapidly retrieve meme data via a clean frontend interface.',
    techStack: ['Python', 'Scrapy', 'Solr', 'Vue.js'],
    link: 'https://github.com/simo-macca/meme-search-engine',
  },
  {
    title: 'ToC Movers',
    subtitle: 'Full-Stack Logistics Modeling',
    description:
      'A web application that models complex logistics problems using Boolean Satisfiability (SAT) solvers. Built with custom backend logic and a reactive frontend.',
    techStack: ['Vue.js', 'Docker', 'Python'],
    link: 'https://github.com/simo-macca/ToC_movers',
  },
  {
    title: 'PyTamaro-Web Dashboard',
    subtitle: "Bachelor's Thesis Project",
    description:
      '"From Raw Data to Pedagogical Insights." A static analysis dashboard designed to extract and visualize data, improving usability and insights for platform users.',
    techStack: ['Python', 'Jinja2', 'Tailwind CSS'],
    link: null,
  },
  {
    title: 'Internship Experience',
    subtitle: 'Company Name / Role',
    description:
      'Brief description of the core responsibilities, achievements, and the technical problems solved during this period.',
    techStack: ['Tech 1', 'Tech 2'],
    link: null,
    isInternship: true,
  },
]
</script>

<template>
  <div class="mx-auto max-w-7xl p-4 md:p-8">
    <h1 class="mb-12 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
      Projects & Experience
    </h1>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
    </div>
  </div>
</template>
