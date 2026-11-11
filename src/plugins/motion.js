import { MotionPlugin } from '@vueuse/motion'

/**
 * Registers the `v-motion-*` entrance presets used across the site.
 *
 * Usage: `<div v-motion-slide-up :delay="100" />`.
 * When the visitor prefers reduced motion, every preset starts in its final
 * state, so content is shown immediately without movement.
 */

const spring = { type: 'spring', stiffness: 260, damping: 26, mass: 0.6 }

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function preset(from, to, { trigger = 'visibleOnce', transition = spring } = {}) {
  if (prefersReducedMotion()) {
    return { initial: to, [trigger]: to }
  }
  return { initial: from, [trigger]: { ...to, transition } }
}

export const motionDirectives = {
  'slide-up': preset({ opacity: 0, y: 32 }, { opacity: 1, y: 0 }),
  'slide-down': preset({ opacity: 0, y: -24 }, { opacity: 1, y: 0 }, { trigger: 'enter' }),
  'slide-left': preset({ opacity: 0, x: -40 }, { opacity: 1, x: 0 }),
  'slide-right': preset({ opacity: 0, x: 40 }, { opacity: 1, x: 0 }),
  'pop-in': preset(
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 },
    { transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.5 } },
  ),
  'fade-in': preset(
    { opacity: 0 },
    { opacity: 1 },
    { transition: { duration: 600, ease: 'easeOut' } },
  ),
}

export function installMotion(app) {
  app.use(MotionPlugin, { directives: motionDirectives })
}
