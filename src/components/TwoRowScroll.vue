<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { vScrollPageAtEdge } from '@/scrollPageAtEdge'

defineProps({ gridClass: String })

const grid = ref(null)
const scrollHeight = ref(null)
let observer

function updateScrollHeight() {
  const rowStarts = new Set(Array.from(grid.value.children, (card) => card.offsetTop))
  const thirdRowStart = Array.from(rowStarts)[2]
  scrollHeight.value = thirdRowStart === undefined ? null : `${thirdRowStart}px`
}

onMounted(() => {
  updateScrollHeight()
  observer = new ResizeObserver(updateScrollHeight)
  observer.observe(grid.value)
  for (const card of grid.value.children) observer.observe(card)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div v-scroll-page-at-edge class="two-row-scroll" role="region" :style="{ '--scroll-height': scrollHeight }">
    <div ref="grid" v-reveal.stagger class="relative grid" :class="gridClass">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@media (width < 48rem) {
  .two-row-scroll {
    max-height: var(--scroll-height, none);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--color-gold) var(--color-sand);
  }
}
</style>
