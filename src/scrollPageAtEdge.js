const listenersByRegion = new WeakMap()

export const vScrollPageAtEdge = {
  mounted(region, { value }) {
    if (value === false || !CSS.supports('overscroll-behavior-y', 'none')) return

    const listeners = new AbortController()
    const options = { passive: true, signal: listeners.signal }
    listenersByRegion.set(region, listeners)

    let startTouch
    let previousTouch

    function resetGesture() {
      startTouch = previousTouch = undefined
      region.classList.remove('scroll-edge-touch')
    }

    region.addEventListener('touchstart', (event) => {
      resetGesture()
      if (event.touches.length !== 1 || event.target.closest('dialog')) return
      if (region.scrollHeight <= region.clientHeight) return

      startTouch = previousTouch = event.touches[0]
      region.classList.add('scroll-edge-touch')
    }, options)

    region.addEventListener('touchmove', (event) => {
      if (!startTouch) return
      const touch = event.touches[0]
      if (event.touches.length !== 1 || touch.identifier !== startTouch.identifier) {
        resetGesture()
        return
      }

      if (previousTouch === startTouch) {
        const horizontal = Math.abs(touch.clientX - startTouch.clientX)
        const vertical = Math.abs(touch.clientY - startTouch.clientY)
        if (Math.max(horizontal, vertical) < 6) return
        if (horizontal > vertical) {
          resetGesture()
          return
        }
      }

      const delta = previousTouch.clientY - touch.clientY
      previousTouch = touch
      const atBottom = region.scrollHeight - region.clientHeight - region.scrollTop <= 1
      const atTop = region.scrollTop <= 1
      if ((delta > 0 && atBottom) || (delta < 0 && atTop)) {
        window.scrollBy({ top: delta, behavior: 'instant' })
      }
    }, options)

    region.addEventListener('touchend', resetGesture, options)
    region.addEventListener('touchcancel', resetGesture, options)
  },

  beforeUnmount(region) {
    listenersByRegion.get(region)?.abort()
  },
}
