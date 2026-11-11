import { computed } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

/**
 * Page scroll state shared by the header progress bar and the back-to-top button.
 *
 * @param {number} [threshold=600] - scroll offset (px) after which `isPastThreshold` is true
 */
export function useScrollProgress(threshold = 600) {
  const { y } = useWindowScroll()
  const { height } = useWindowSize()

  const progress = computed(() => {
    if (typeof document === 'undefined') return 0
    const scrollable = document.documentElement.scrollHeight - height.value
    return scrollable > 0 ? Math.min(1, Math.max(0, y.value / scrollable)) : 0
  })

  const isPastThreshold = computed(() => y.value > threshold)

  return { progress, isPastThreshold }
}
