<script setup>
import { media } from '@/site'
import AppIcon from './AppIcon.vue'
import PhotoPreview from './PhotoPreview.vue'

defineProps({ item: { type: Object, required: true }, imageClass: { type: String, default: 'aspect-[1.8]' }, inset: Boolean })
</script>

<template>
  <article class="card lift-card min-w-0 overflow-hidden" :class="{ 'p-1': inset }">
    <PhotoPreview :src="media(item.image + '.jpg')" :alt="item.alt ?? item.title" :title="item.title" :class="[imageClass, { 'rounded-lg': inset }]" />
    <div class="px-3 py-2">
      <h3 class="font-display flex items-center gap-2 text-[clamp(1.13rem,1.65vw,1.5rem)] leading-tight font-bold text-ink">
        <AppIcon v-if="item.icon" :name="item.icon" class="text-gold" />{{ item.title }}
      </h3>
      <p v-if="item.description" class="mt-1 text-[.9rem] leading-snug text-ink-soft">{{ item.description }}</p>
      <slot :item="item" />
    </div>
  </article>
</template>
