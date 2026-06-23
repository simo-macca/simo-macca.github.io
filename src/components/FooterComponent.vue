<script setup>
import { Copyright } from '@lucide/vue'
import LinkedinComponent from '@/components/LinkedinComponent.vue'
import GitHubComponent from '@/components/GitHubComponent.vue'
</script>

<template>
  <footer class="mt-20 border-t border-t-slate-200 dark:border-t-slate-800">
    <div
      class="mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8"
    >
      <p
        class="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300"
        v-motion-slide-up
        :delay="100"
      >
        <Copyright /> 2025 Simone Maccario. All rights reserved.
      </p>
      <div class="flex gap-6">
        <GitHubComponent v-motion-slide-up :delay="200" />
        <LinkedinComponent v-motion-slide-up :delay="300" />
      </div>
    </div>
  </footer>
</template>
