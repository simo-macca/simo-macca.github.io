import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'

/**
 * Positions a single "pill" behind the active item of a group (navigation,
 * filter tabs), so it glides between items instead of jumping.
 *
 * Mark every item inside the container with `data-indicator-key="<key>"` and
 * bind the returned `style` to an absolutely positioned element.
 *
 * @param {import('vue').Ref<HTMLElement | null>} containerRef
 * @param {import('vue').Ref<string | null> | (() => string | null)} activeKey
 */
export function useSlidingIndicator(containerRef, activeKey) {
  const rect = ref({ left: 0, top: 0, width: 0, height: 0 })
  const visible = ref(false)
  // The first placement must not animate from 0,0.
  const hasPlaced = ref(false)

  function measure() {
    const container = containerRef.value
    const key = typeof activeKey === 'function' ? activeKey() : activeKey.value
    const target = key ? container?.querySelector(`[data-indicator-key="${key}"]`) : null

    if (!container || !target) {
      visible.value = false
      return
    }

    rect.value = {
      left: target.offsetLeft,
      top: target.offsetTop,
      width: target.offsetWidth,
      height: target.offsetHeight,
    }
    visible.value = true
    requestAnimationFrame(() => {
      hasPlaced.value = true
    })
  }

  watch(activeKey, () => nextTick(measure))
  useResizeObserver(containerRef, () => measure())
  onMounted(() => {
    nextTick(measure)
    // Web fonts change text widths once they load.
    document.fonts?.ready.then(measure).catch(() => {})
  })

  const style = computed(() => ({
    width: `${rect.value.width}px`,
    height: `${rect.value.height}px`,
    transform: `translate3d(${rect.value.left}px, ${rect.value.top}px, 0)`,
    opacity: visible.value ? 1 : 0,
    transitionProperty: hasPlaced.value ? 'transform, width, height, opacity' : 'opacity',
  }))

  return { style, measure }
}
