<script setup>
import { Copyright } from '@lucide/vue'
import LinkedinComponent from '@/components/LinkedinComponent.vue'
import GitHubComponent from '@/components/GitHubComponent.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-20 border-t border-slate-200/80 dark:border-slate-800/80">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8"
    >
      <p
        class="flex items-center justify-center gap-1.5 text-sm text-slate-600 dark:text-slate-400"
        v-motion-slide-up
        :delay="100"
      >
        <Copyright class="h-4 w-4" aria-hidden="true" />
        <span>{{ currentYear }} Simone Maccario. All rights reserved.</span>
      </p>
      <div class="flex items-center gap-4">
        <GitHubComponent v-motion-slide-up :delay="200" />
        <LinkedinComponent v-motion-slide-up :delay="300" />
      </div>
    </div>
  </footer>
</template>
