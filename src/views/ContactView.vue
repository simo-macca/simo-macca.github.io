<script setup>
import { Mail, MapPin } from 'lucide-vue-next'
import GitHubComponent from '@/components/GitHubComponent.vue'
import LinkedinComponent from '@/components/LinkedinComponent.vue'
import ContactCardComponent from '@/components/ContactCardComponent.vue'
import ContactFormComponent from '@/components/ContactFormComponent.vue'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: 'simone.maccario04@gmail.com',
    link: 'mailto:simone.maccario04@gmail.com',
    description: 'Drop me an email anytime',
  },
  {
    icon: GitHubComponent,
    title: 'GitHub',
    value: 'github.com/simo-macca',
    link: 'https://github.com/simo-macca',
    description: 'Check out my repositories',
  },
  {
    icon: LinkedinComponent,
    title: 'LinkedIn',
    value: 'linkedin.com/in/simone-maccario-70a339362',
    link: 'https://linkedin.com/in/simone-maccario-70a339362',
    description: "Let's connect professionally",
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Como, Italy',
    link: 'https://maps.app.goo.gl/pxusHfuBjvR6uA3j7',
    description: 'Available for remote work',
  },
]
</script>

<template>
  <section class="flex min-h-dvh flex-col items-center justify-center gap-4 sm:mt-30 sm:pt-25">
    <div class="mb-8 text-center" v-motion-fade-in>
      <h2 class="mb-8 text-4xl font-bold text-slate-900 dark:text-white">
        Let's Work <span class="text-sky-500 dark:text-sky-400">Together</span>
      </h2>
      <p
        class="max-w-2xl px-4 text-justify text-xl text-slate-600 sm:my-4 md:text-center dark:text-slate-300"
      >
        I'm currently seeking my first professional role as a Full-Stack Developer. Feel free to
        reach out for opportunities, collaborations, or just to say hi!
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-5">
      <div class="grid h-full content-stretch gap-4 sm:col-span-2 sm:grid-cols-2 md:grid-cols-1">
        <ContactCardComponent :methods="contactMethods" />
      </div>
      <ContactFormComponent class="px-4 py-8 sm:col-span-2" v-motion-slide-right :delay="200" />
    </div>
  </section>
</template>
