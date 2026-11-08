<script setup>
import { media } from '@/site'
import HeroCarousel from './HeroCarousel.vue'

defineProps({ title: String, subtitle: String, variant: { type: String, default: 'riverside' }, seal: String, backgroundImage: String })
</script>

<template>
  <section class="page-hero relative isolate overflow-hidden" :class="'hero-' + variant">
    <div
      v-if="variant === 'riverside'"
      class="hero-river-art"
      :class="{ 'hero-river-art-landscape': backgroundImage }"
      :style="{ backgroundImage: 'url(' + media(backgroundImage ?? 'teahouse-album-hall.jpg') + ')' }"
      aria-hidden="true"
    ></div>
    <div class="site-shell hero-inner relative flex items-center">
      <div class="hero-copy">
        <div class="hero-heading flex items-start gap-2">
          <h1 class="brush hero-title whitespace-pre-line">{{ title }}</h1>
          <span v-if="seal" class="seal mt-2 shrink-0">{{ seal }}</span>
        </div>
        <p v-if="subtitle" class="hero-subtitle mt-1 inline-block">{{ subtitle }}</p>
        <div class="hero-description mt-3"><slot /></div>
        <div v-if="$slots.actions" class="hero-actions mt-4 flex flex-wrap items-center gap-2 sm:gap-3"><slot name="actions" /></div>
      </div>
    </div>
    <HeroCarousel v-if="variant !== 'riverside'" :variant="variant" />
  </section>
</template>
