<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { media } from '@/site'

const props = defineProps({ variant: { type: String, required: true } })
const slides = computed(() => [
  { file: 'entrance.jpg', position: '53% 54%' },
  { file: 'stage.jpg', position: '43% 54%' },
  props.variant === 'menu'
    ? { file: 'sanjiang-breakfast.jpg', position: '50% 64%' }
    : { file: 'culture-street.jpg', position: '60% 45%' },
])

const artwork = ref(null)
const readySlides = ref([])
const current = ref(-1)
const previous = ref(-1)
const playing = ref(false)
const inView = ref(false)
const tabVisible = ref(false)
let viewportObserver
let motionPreference
let disposed = false

function select(index) {
  if (index === current.value) return
  previous.value = current.value
  current.value = index
}

function syncVisibility() {
  tabVisible.value = !document.hidden
}

function syncMotionPreference() {
  playing.value = !motionPreference.matches
}

watchEffect((onCleanup) => {
  const indices = readySlides.value
  if (!playing.value || !inView.value || !tabVisible.value || indices.length < 2) return
  const index = indices.indexOf(current.value)
  const timer = window.setTimeout(() => select(indices[(index + 1) % indices.length]), index < 0 ? 4700 : 5600)
  onCleanup(() => window.clearTimeout(timer))
})

onMounted(async () => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotionPreference()
  syncVisibility()
  motionPreference.addEventListener('change', syncMotionPreference)
  document.addEventListener('visibilitychange', syncVisibility)

  if ('IntersectionObserver' in window) {
    viewportObserver = new IntersectionObserver(([entry]) => {
      inView.value = entry.isIntersecting && entry.intersectionRatio >= .2
    }, { threshold: .2 })
    viewportObserver.observe(artwork.value)
  } else {
    inView.value = true
  }

  // Keep the opening collage in place until the same images are ready to display individually.
  const images = Array.from(artwork.value.querySelectorAll('.hero-slide img'))
  const results = await Promise.allSettled(images.map((image) => image.decode()))
  if (!disposed) readySlides.value = results.flatMap(({ status }, index) => status === 'fulfilled' ? [index] : [])
})

onBeforeUnmount(() => {
  disposed = true
  viewportObserver?.disconnect()
  motionPreference?.removeEventListener('change', syncMotionPreference)
  document.removeEventListener('visibilitychange', syncVisibility)
})
</script>

<template>
  <div ref="artwork" class="hero-carousel-art" aria-hidden="true">
    <div class="hero-collage">
      <img v-for="(slide, index) in slides" :key="slide.file" :src="media(slide.file)" alt=""
        :fetchpriority="index === 0 ? 'high' : undefined" />
    </div>
    <div v-for="(slide, index) in slides" :key="slide.file" class="hero-slide"
      :class="{ 'is-current': current === index, 'is-previous': previous === index }">
      <img :src="media(slide.file)" :style="{ objectPosition: slide.position }" alt="" fetchpriority="low" />
    </div>
  </div>
</template>
