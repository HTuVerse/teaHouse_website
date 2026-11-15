<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import { media } from '@/site'

const props = defineProps({ item: { type: Object, required: true }, file: String })
const photos = computed(() => [
  { file: props.file ?? props.item.image, alt: props.item.alt ?? props.item.title, position: props.item.imagePosition },
  ...(props.item.photos ?? []),
].map((photo) => ({ ...photo, src: media(photo.file) })))

const frame = ref(null)
const loaded = ref(new Set())
const current = ref(0)
const previous = ref(-1)
const inView = ref(false)
const pageVisible = ref(false)
const allowsMotion = ref(false)
let observer
let motionPreference

function syncVisibility() {
  pageVisible.value = !document.hidden
}

function syncMotion() {
  allowsMotion.value = !motionPreference.matches
}

watchEffect((onCleanup) => {
  if (!allowsMotion.value || !inView.value || !pageVisible.value) return

  const files = photos.value.map((photo) => photo.file)
  const next = [...files.slice(current.value + 1), ...files.slice(0, current.value)]
    .find((file) => loaded.value.has(file))
  if (!next) return

  const timer = window.setTimeout(() => {
    previous.value = loaded.value.has(files[current.value]) ? current.value : -1
    current.value = files.indexOf(next)
  }, 10000)
  onCleanup(() => window.clearTimeout(timer))
})

onMounted(() => {
  if (photos.value.length < 2) return

  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  syncMotion()
  syncVisibility()
  motionPreference.addEventListener('change', syncMotion)
  document.addEventListener('visibilitychange', syncVisibility)

  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(([entry]) => {
      inView.value = entry.isIntersecting && entry.intersectionRatio >= 0.25
    }, { threshold: 0.25 })
    observer.observe(frame.value)
  } else {
    inView.value = true
  }
})

onBeforeUnmount(() => {
  if (!motionPreference) return
  observer?.disconnect()
  motionPreference.removeEventListener('change', syncMotion)
  document.removeEventListener('visibilitychange', syncVisibility)
})
</script>

<template>
  <div ref="frame" class="relative isolate w-full overflow-hidden">
    <img v-for="(photo, index) in photos" :key="photo.file"
      :src="photo.src" :alt="index === current ? photo.alt : ''"
      :style="{ objectPosition: photo.position }"
      class="card-photo absolute inset-0 size-full object-cover"
      :class="{ 'is-current': index === current, 'is-previous': index === previous, 'is-fading': index === current && previous !== -1 }"
      loading="lazy" @load="loaded.add(photo.file)" />
  </div>
</template>

<style scoped>
.card-photo { opacity: 0; }
.is-previous { z-index: 1; opacity: 1; }
.is-current { z-index: 2; opacity: 1; }

@media (prefers-reduced-motion: no-preference) {
  .is-fading { animation: card-photo-fade-in 850ms ease-in-out both; }
}

@keyframes card-photo-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
