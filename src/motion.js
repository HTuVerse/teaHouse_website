let observer
const observed = new WeakMap()

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || !observed.has(target)) continue
        target.classList.add('reveal-in')
        observer.unobserve(target)
        observed.delete(target)
      }
    })
  }
  return observer
}

// Observe each item separately so long lists reveal as they enter the viewport.
export const reveal = {
  mounted(el, { modifiers }) {
    if (!('IntersectionObserver' in window)) return
    const items = modifiers.stagger ? Array.from(el.children) : [el]
    const watcher = getObserver()
    items.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', Math.min(index, 5) * 60 + 'ms')
      observed.set(item, el)
      watcher.observe(item)
    })
  },
  beforeUnmount(el, { modifiers }) {
    const items = modifiers.stagger ? Array.from(el.children) : [el]
    for (const item of items) {
      if (observed.get(item) !== el) continue
      observer.unobserve(item)
      observed.delete(item)
    }
  },
}
