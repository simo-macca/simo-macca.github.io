import { nextTick } from 'vue'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs a state change inside a View Transition when the browser supports it.
 *
 * - `circle`: the new state expands as a circle from `origin` (theme switch).
 * - `fade`:   a short cross-fade of the whole page (language switch).
 *
 * Falls back to a plain update when the API is missing or reduced motion is on.
 *
 * @param {() => void} update - synchronous state change (Vue renders on nextTick)
 * @param {{ type?: 'circle' | 'fade', origin?: { x: number, y: number } }} [options]
 */
export async function withViewTransition(update, { type = 'fade', origin } = {}) {
  if (typeof document === 'undefined' || !document.startViewTransition || prefersReducedMotion()) {
    update()
    return
  }

  const root = document.documentElement
  root.dataset.vt = type

  const transition = document.startViewTransition(async () => {
    update()
    await nextTick()
  })

  try {
    if (type === 'circle') {
      await transition.ready
      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? 0
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    }
    await transition.finished
  } catch {
    // An interrupted transition still applies the update; nothing to recover.
  } finally {
    delete root.dataset.vt
  }
}
