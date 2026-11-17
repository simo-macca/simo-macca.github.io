<script setup>
/**
 * Shared heading block for page sections: numbered eyebrow, title and subtitle.
 * Left-aligned; on large screens the subtitle sits beside the title.
 * Pass custom title markup through the default slot.
 */
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  index: {
    type: Number,
    default: null,
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
  <header
    class="mb-12 grid gap-4 sm:mb-16 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end lg:gap-12"
  >
    <div v-reveal>
      <p v-if="eyebrow" class="mb-4 flex items-center gap-3 eyebrow">
        <span v-if="index !== null" class="text-slate-400 dark:text-mist-400">
          {{ String(index).padStart(2, '0') }}
        </span>
        <span class="h-px w-8 bg-current opacity-40" aria-hidden="true" />
        {{ eyebrow }}
      </p>
      <h2
        :id="headingId"
        class="text-4xl font-semibold tracking-tighter text-balance text-slate-900 sm:text-5xl dark:text-mist-100"
      >
        <slot>{{ title }}</slot>
      </h2>
    </div>
    <p
      v-if="subtitle"
      v-reveal="120"
      class="text-base leading-relaxed text-pretty text-slate-500 sm:text-lg dark:text-mist-400"
    >
      {{ subtitle }}
    </p>
  </header>
</template>
