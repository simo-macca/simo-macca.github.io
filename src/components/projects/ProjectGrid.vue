<script setup>
import { ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

// Responsive breakpoint: Desktop/Tablet (>= 768px) vs Mobile (< 768px)
const isDesktop = useMediaQuery('(min-width: 768px)')

// Set of currently expanded project IDs
// Mobile: At most 1 ID (mutually exclusive accordion)
// Desktop/Tablet: Multiple IDs allowed (independent toggles)
const expandedCardIds = ref(new Set())

// Template refs map for accessing card DOM elements
const cardRefs = new Map()

const setCardRef = (id, el) => {
  if (el) {
    // If el is a Vue component instance, el.$el is the root DOM element
    cardRefs.set(id, el.$el || el)
  } else {
    cardRefs.delete(id)
  }
}

const getCardElement = (id) => {
  return (
    cardRefs.get(id) ||
    (typeof document !== 'undefined' ? document.getElementById(`project-${id}`) : null)
  )
}

const handleToggle = (id) => {
  if (isDesktop.value) {
    // Desktop/Tablet: independent multi-card toggle
    if (expandedCardIds.value.has(id)) {
      expandedCardIds.value.delete(id)
    } else {
      expandedCardIds.value.add(id)
    }
    return
  }

  // Mobile: mutually exclusive accordion with scroll jump prevention
  const isCurrentlyExpanded = expandedCardIds.value.has(id)

  if (isCurrentlyExpanded) {
    // Tapping an already open card collapses it; no scroll jump occurs
    expandedCardIds.value.delete(id)
    return
  }

  // An inactive card is being expanded on mobile
  const prevExpandedId = [...expandedCardIds.value][0]
  let collapseHeight = 0

  if (prevExpandedId && prevExpandedId !== id) {
    const prevIndex = props.projects.findIndex((p) => p.id === prevExpandedId)
    const newIndex = props.projects.findIndex((p) => p.id === id)

    // Layout shift only impacts the target if the collapsing card is above it in the DOM flow
    if (prevIndex !== -1 && newIndex !== -1 && prevIndex < newIndex) {
      const prevEl = getCardElement(prevExpandedId)
      if (prevEl) {
        const collapsible = prevEl.querySelector('[data-project-collapsible]')
        if (collapsible) {
          collapseHeight = collapsible.scrollHeight
        }
      }
    }
  }

  const targetEl = getCardElement(id)
  let targetScrollY = null

  if (targetEl && typeof window !== 'undefined') {
    const header = document.querySelector('header')
    const headerOffset = (header ? header.offsetHeight : 64) + 16 // 80px buffer below sticky navbar
    const currentTargetTop = targetEl.getBoundingClientRect().top
    const currentScrollY = window.scrollY
    const finalAbsoluteTop = currentScrollY + currentTargetTop - collapseHeight
    targetScrollY = Math.max(0, finalAbsoluteTop - headerOffset)
  }

  // Set exclusive active card
  expandedCardIds.value.clear()
  expandedCardIds.value.add(id)

  if (targetScrollY !== null && typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: targetScrollY,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }
}

// Automatically collapse if the currently expanded projects are filtered out
watch(
  () => props.projects,
  (newProjects) => {
    const validIds = new Set(newProjects.map((p) => p.id))
    for (const id of expandedCardIds.value) {
      if (!validIds.has(id)) {
        expandedCardIds.value.delete(id)
      }
    }
  },
)

// When resizing from desktop to mobile, preserve at most one expanded card
watch(isDesktop, (desktop) => {
  if (!desktop && expandedCardIds.value.size > 1) {
    const [firstId] = expandedCardIds.value
    expandedCardIds.value.clear()
    if (firstId) {
      expandedCardIds.value.add(firstId)
    }
  }
})
</script>

<template>
  <div
    v-if="projects.length > 0"
    class="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
  >
    <ProjectCard
      v-for="(project, index) in projects"
      :key="project.id"
      :ref="(el) => setCardRef(project.id, el)"
      :project="project"
      :is-expanded="expandedCardIds.has(project.id)"
      v-motion-slide-up
      :delay="(index % 3) * 100"
      @toggle="handleToggle(project.id)"
    />
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800"
  >
    <p class="text-sm text-slate-500 dark:text-slate-400">No projects found in this category.</p>
  </div>
</template>
