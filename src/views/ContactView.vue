<script setup>
import ContactCardComponent from '@/components/ContactCardComponent.vue'
import ContactFormComponent from '@/components/ContactFormComponent.vue'
import { contactMethods } from '@/data/socials.js'
</script>

<template>
  <section
    class="flex flex-col items-center justify-center gap-6 py-20"
    aria-label="Contact section"
  >
    <div class="mb-4 text-center" v-motion-fade-in>
      <h2
        class="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
      >
        Let's Work <span class="text-sky-500 dark:text-sky-400">Together</span>
      </h2>
      <p
        class="mx-auto max-w-2xl px-4 text-center text-lg text-slate-600 sm:text-xl dark:text-slate-300"
      >
        I'm always interested in technical discussions, collaborative research, and engineering
        opportunities. Feel free to reach out!
      </p>
    </div>

    <div class="grid w-full max-w-5xl gap-8 md:grid-cols-5">
      <div class="flex flex-col justify-between gap-4 md:col-span-2">
        <ContactCardComponent
          v-for="(method, index) in contactMethods"
          :key="method.title"
          :method="method"
          v-motion-slide-left
          :delay="index * 100"
        />
      </div>
      <div class="md:col-span-3" v-motion-slide-right :delay="200">
        <ContactFormComponent />
      </div>
    </div>
  </section>
</template>
