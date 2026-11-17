/**
 * `v-reveal`: scroll-triggered entrance animation.
 *
 * Usage:
 *   <div v-reveal />                 fade + rise (default 'up')
 *   <div v-reveal:left="120" />      direction as the argument, delay (ms) as the value
 *   <div v-reveal:scale />           'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
 *
 * How it works: the element is hidden until it enters the viewport, then it is
 * animated with the Web Animations API (`fill: 'backwards'`). Nothing is left
 * behind afterwards, so the element's own Tailwind `translate` / `scale` hover
 * effects and transitions keep working (no inline `transform` to fight with).
 *
 * One shared IntersectionObserver serves every element. When the visitor
 * prefers reduced motion, or the browser lacks IntersectionObserver / WAAPI,
 * elements are shown immediately.
 */

const DURATION = 900
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)'

const OFFSETS = {
  up: 'translate3d(0, 28px, 0)',
  down: 'translate3d(0, -20px, 0)',
  left: 'translate3d(-36px, 0, 0)',
  right: 'translate3d(36px, 0, 0)',
  scale: 'scale(0.94)',
  fade: 'none',
}

const isBrowser = typeof window !== 'undefined'

const canAnimate = () =>
  isBrowser &&
  'IntersectionObserver' in window &&
  typeof Element.prototype.animate === 'function' &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** @type {WeakMap<Element, { direction: string, delay: number }>} */
const configs = new WeakMap()
let observer = null

function play(el) {
  const { direction, delay } = configs.get(el) ?? { direction: 'up', delay: 0 }
  el.style.opacity = ''
  el.animate(
    [
      { opacity: 0, transform: OFFSETS[direction] ?? OFFSETS.up, filter: 'blur(6px)' },
      { opacity: 1, transform: 'none', filter: 'blur(0)' },
    ],
    { duration: DURATION, delay, easing: EASING, fill: 'backwards' },
  )
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        play(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

const parseDelay = (value) => {
  const delay = typeof value === 'object' && value !== null ? value.delay : value
  return Number.isFinite(Number(delay)) ? Number(delay) : 0
}

export const vReveal = {
  mounted(el, binding) {
    if (!canAnimate()) return
    configs.set(el, { direction: binding.arg ?? 'up', delay: parseDelay(binding.value) })
    el.style.opacity = '0'
    getObserver().observe(el)
  },
  updated(el, binding) {
    const config = configs.get(el)
    if (config) config.delay = parseDelay(binding.value)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
    configs.delete(el)
  },
}

export function installReveal(app) {
  app.directive('reveal', vReveal)
}
