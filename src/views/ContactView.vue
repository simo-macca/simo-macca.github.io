<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import ContactCardComponent from '@/components/ContactCardComponent.vue'
import ContactFormComponent from '@/components/ContactFormComponent.vue'
import { contactMethods } from '@/data/socials.js'

const contactGridRef = ref(null)
const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  contactGridRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true
      stop()
    }
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  },
)
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

    <div
      ref="contactGridRef"
      class="grid w-full max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-2"
    >
      <div class="flex flex-col justify-start gap-4">
        <div
          v-for="(method, index) in contactMethods"
          :key="method.title"
          class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
          :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <ContactCardComponent :method="method" />
        </div>
      </div>
      <div
        class="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none"
        :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
        :style="{ transitionDelay: '150ms' }"
      >
        <ContactFormComponent />
      </div>
    </div>
  </section>
</template>
