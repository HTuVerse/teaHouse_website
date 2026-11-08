<script setup>
import AppIcon from '@/components/AppIcon.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import { media } from '@/site'
defineProps({ item: { type: Object, required: true } })
</script>

<template>
  <article class="card p-3">
    <h3 class="font-display flex items-center gap-2 border-b border-line/65 pb-2 text-[clamp(1.2rem,2vw,1.65rem)] leading-tight font-bold text-rust">
      <AppIcon :name="item.icon" class="text-[1.4em]" />{{ item.title }}
    </h3>
    <div class="mt-2 grid grid-cols-[1fr_.85fr] items-start gap-3">
      <PhotoPreview :src="media(item.image + '.jpg')" :alt="item.alt" class="aspect-[1.35] rounded-lg" />
      <p class="text-sm leading-snug sm:text-base">{{ item.description }}</p>
    </div>
  </article>
</template>
