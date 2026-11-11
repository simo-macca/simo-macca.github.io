/**
 * Drives the `.spotlight` utility (see `main.css`): stores the pointer
 * position relative to the element in CSS custom properties.
 * Touch pointers are ignored, so mobile devices are unaffected.
 */
export function useSpotlight() {
  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return { onPointerMove }
}
