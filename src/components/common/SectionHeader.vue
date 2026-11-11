<script setup>
/** Shared heading block for page sections: eyebrow label, title and subtitle. */
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  headingId: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <header class="mb-12 text-center sm:mb-14" v-motion-fade-in>
    <p
      v-if="eyebrow"
      class="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-sky-600 uppercase dark:text-sky-400"
    >
      <span class="h-px w-6 bg-current opacity-60" aria-hidden="true" />
      {{ eyebrow }}
      <span class="h-px w-6 bg-current opacity-60" aria-hidden="true" />
    </p>
    <h2
      :id="headingId"
      class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-mist-100"
    >
      <slot>{{ title }}</slot>
    </h2>
    <p
      v-if="subtitle"
      class="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-mist-400"
    >
      {{ subtitle }}
    </p>
  </header>
</template>
