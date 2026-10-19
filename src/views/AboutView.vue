<script setup>
import profileImg from '@/components/icons/my_profile.jpeg'
import { BookOpen, Cpu, Database, Network } from '@lucide/vue'

const pillars = [
  {
    icon: Database,
    title: 'Data Systems & Engines',
    description:
      'Query optimization, indexing strategies, distributed data storage, and storage engine internals.',
  },
  {
    icon: Cpu,
    title: 'Machine Intelligence & Search',
    description:
      'Multi-modal information retrieval, NLP embeddings, algorithmic SAT solver modeling, and feature pipelines.',
  },
  {
    icon: Network,
    title: 'Full-Stack & Systems Architecture',
    description:
      'Modern reactive web applications (Vue 3), robust backend microservices (Spring Boot, Python), and automated CI/CD.',
  },
]
</script>

<template>
  <section class="py-20" aria-label="About section">
    <div class="mx-auto max-w-6xl">
      <!-- Section Header -->
      <div class="mb-14 text-center" v-motion-fade-in>
        <h2
          class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-[#F3F4F6]"
        >
          About &amp; Engineering Philosophy
        </h2>
        <p class="mt-3 text-base text-slate-600 sm:text-lg dark:text-[#9CA3AF]">
          Bridging mathematical rigor, database systems, and production-grade software engineering.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <!-- Left Column: Profile & Academic Snapshot -->
        <div class="flex flex-col items-center lg:col-span-4" v-motion-slide-left :delay="150">
          <div class="group relative">
            <!-- Glow background -->
            <div
              class="absolute -inset-1 rounded-full bg-linear-to-r from-sky-500 to-indigo-500 opacity-30 blur-md transition duration-300 group-hover:opacity-50"
            />
            <img
              :src="profileImg"
              alt="Simone Maccario - MSc Computer Science at ETH Zurich"
              class="relative h-56 w-56 rounded-full border-4 border-white object-cover shadow-xl dark:border-[#111827] dark:shadow-sky-950/30"
              width="224"
              height="224"
              loading="lazy"
            />
          </div>

          <!-- Academic Snapshot Card -->
          <div
            class="mt-6 w-full rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-xs backdrop-blur-sm dark:border-white/8 dark:bg-[#111827]/80"
          >
            <div
              class="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-[#F3F4F6]"
            >
              <BookOpen class="h-4 w-4 text-sky-500 dark:text-sky-400" />
              <span>Academic Trajectory</span>
            </div>
            <ul class="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
              <li class="border-b border-slate-100 pb-2.5 dark:border-white/4">
                <strong class="block text-slate-800 dark:text-[#F3F4F6]">ETH Zurich</strong>
                <span>MSc in Computer Science (Data Management &amp; Machine Intelligence)</span>
              </li>
              <li>
                <strong class="block text-slate-800 dark:text-[#F3F4F6]"
                  >Università della Svizzera italiana (USI)</strong
                >
                <span>BSc in Informatics &middot; Magna cum laude</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column: Narrative & Technical Pillars -->
        <div class="flex flex-col gap-6 lg:col-span-8" v-motion-slide-right :delay="250">
          <div class="space-y-4 text-base leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
            <p>
              I am currently pursuing a
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]"
                >Master of Science in Computer Science at ETH Zurich</strong
              >, specializing in
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]"
                >Data Management and Machine Intelligence</strong
              >. My work focuses on scalable data processing systems, database internals, query
              optimization, and applied intelligent systems.
            </p>
            <p>
              Having completed my Bachelor's degree in Informatics at USI Lugano, I approach
              software engineering with a balance of foundational theory and practical rigor. My
              academic projects span multi-modal information retrieval with inverted indices and
              Solr, computational complexity reductions to SAT solvers for motion planning, and data
              pipeline analytics for educational platforms.
            </p>
            <p>
              In parallel with systems-level engineering, I take deep pride in crafting responsive,
              resilient, and accessible full-stack applications. From reactive interfaces built with
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]"
                >Vue 3 and Tailwind CSS</strong
              >
              to microservices powered by
              <strong class="font-semibold text-slate-900 dark:text-[#F3F4F6]"
                >Spring Boot, Python, and Docker</strong
              >, I build software that is modular, thoroughly tested, and maintainable.
            </p>
          </div>

          <!-- Technical Pillars -->
          <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-2xs backdrop-blur-sm transition-all hover:border-sky-400/40 dark:border-white/8 dark:bg-[#111827]/70"
            >
              <component
                :is="pillar.icon"
                class="mb-2 h-5 w-5 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              <h3 class="text-sm font-bold text-slate-900 dark:text-[#F3F4F6]">
                {{ pillar.title }}
              </h3>
              <p class="mt-1 text-xs leading-relaxed text-slate-600 dark:text-[#9CA3AF]">
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
