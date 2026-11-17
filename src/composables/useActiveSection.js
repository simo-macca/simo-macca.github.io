import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which page section is currently in view (scroll-spy).
 *
 * A section counts as active when it crosses a thin horizontal band around the
 * upper-middle of the viewport. The observer callback only reports sections
 * whose state *changed*, so the intersection state of every section is kept in
 * a map and the active one is always derived from the full picture (first
 * intersecting section in document order).
 *
 * @param {string[]} sectionIds - element ids in document order
 * @returns {{ activeId: import('vue').Ref<string | null> }}
 */
export function useActiveSection(sectionIds) {
  const activeId = ref(null)
  const intersecting = new Map(sectionIds.map((id) => [id, false]))
  let observer = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) intersecting.set(entry.target.id, entry.isIntersecting)
        const current = sectionIds.find((id) => intersecting.get(id))
        if (current) activeId.value = current
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )

    sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((section) => observer.observe(section))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId }
}
