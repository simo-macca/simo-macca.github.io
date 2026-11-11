import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which page section is currently in view (scroll-spy).
 *
 * A section counts as active when it crosses a horizontal band around the
 * middle of the viewport, which works for both short and tall sections.
 *
 * @param {string[]} sectionIds - element ids in document order
 * @returns {{ activeId: import('vue').Ref<string | null> }}
 */
export function useActiveSection(sectionIds) {
  const activeId = ref(null)
  let observer = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) activeId.value = visible[0].target.id
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((section) => observer.observe(section))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
