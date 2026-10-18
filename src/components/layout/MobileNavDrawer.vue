<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
})

defineEmits(['close'])
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      id="mobile-nav-menu"
      class="border-b border-slate-200 bg-white/95 px-4 pt-2 pb-4 shadow-lg backdrop-blur-md sm:hidden dark:border-white/[0.08] dark:bg-[#0B0F17]/95"
    >
      <div class="flex flex-col space-y-1">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="$emit('close')"
          class="rounded-lg px-4 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-[#9CA3AF] dark:hover:bg-white/[0.06] dark:hover:text-[#F3F4F6]"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </transition>
</template>
