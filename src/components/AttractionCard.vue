<script setup>
import { computed } from 'vue'
import { media } from '@/site'
import CardDetails from './CardDetails.vue'

const props = defineProps({ place: { type: Object, required: true } })
const cover = computed(() => props.place.photos[0])
</script>

<template>
  <CardDetails :id="place.id" :title="place.title" :description="place.description" :photos="place.photos"
    class="attractions-card card lift-card">
    <div class="attractions-photo">
      <img :src="media(cover.file)" :alt="cover.alt" loading="lazy" decoding="async"
        :style="{ objectPosition: cover.position }" class="size-full object-cover" />
    </div>
    <div class="attractions-card-copy">
      <p v-if="place.label" class="mb-1 text-sm font-bold text-gold">{{ place.label }}</p>
      <h3 class="text-xl leading-tight font-bold text-rust">{{ place.title }}</h3>
      <p class="mt-2 text-base leading-relaxed text-ink-soft">{{ place.description }}</p>
    </div>
    <template v-if="place.label" #description>
      <p class="mb-1 text-sm font-bold text-gold">{{ place.label }}</p>
      <p>{{ place.description }}</p>
    </template>
  </CardDetails>
</template>

<style scoped>
.attractions-card { min-width: 0; }
html:not(.using-touch) .attractions-card:target { outline: 2px solid var(--color-rust); outline-offset: 3px; }
.attractions-photo {
  aspect-ratio: 4 / 3;
  border-radius: .66rem .66rem 0 0;
  background: var(--color-sand);
  overflow: hidden;
}
.attractions-card-copy { padding: .9rem 1rem 1rem; }

@media (width < 34rem) {
  .attractions-card-copy { padding: .65rem; }
  .attractions-card-copy h3 { font-size: 1.05rem; }
  .attractions-card-copy p { font-size: .875rem; line-height: 1.5; }
}

@media (width < 48rem) {
  .attractions-card--wide-photo {
    padding: .45rem;
    border-color: #bfa387;
  }
  .attractions-card--wide-photo:target { outline-offset: -2px; }
  .attractions-card--wide-photo .attractions-photo {
    aspect-ratio: 5 / 2;
    border-radius: .55rem;
  }
  .attractions-card--wide-photo .attractions-card-copy { padding: .5rem .2rem .25rem; }
  .attractions-card--wide-photo h3 { font-size: 1.2rem; }
  .attractions-card--wide-photo .attractions-card-copy p { font-size: .95rem; line-height: 1.5; }
}
</style>
