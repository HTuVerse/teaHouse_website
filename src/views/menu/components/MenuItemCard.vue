<script setup>
import PhotoPreview from '@/components/PhotoPreview.vue'
import { media } from '@/site'
defineProps({ item: { type: Object, required: true }, portrait: Boolean })
</script>

<template>
  <article class="card lift-card min-w-0 overflow-hidden" :class="{ 'text-center': portrait }">
    <PhotoPreview :src="media(item.image + '.jpg')" :alt="item.title" :class="portrait ? 'aspect-[.96]' : 'aspect-[1.95]'" />
    <div class="px-2.5 py-1.5">
      <h3 class="font-display text-[clamp(1.13rem,1.85vw,1.7rem)] leading-tight font-bold text-rust">{{ item.title }}</h3>
      <p class="mt-0.5 text-sm leading-tight sm:text-base">{{ item.description }}</p>
    </div>
  </article>
</template>
