<script setup>
import CardDetails from '@/components/CardDetails.vue'
import { media } from '@/site'
defineProps({
  item: { type: Object, required: true },
  centered: Boolean,
  imageClass: { type: String, default: 'aspect-[1.95]' },
})
</script>

<template>
  <CardDetails :title="item.title" :description="item.description" :file="item.image + '.jpg'"
    class="card lift-card min-w-0 overflow-hidden" :class="{ 'text-center': centered }">
    <img :src="media(item.image + '.jpg')" :alt="item.title" :class="imageClass" class="w-full object-cover" loading="lazy" />
    <div class="px-2.5 py-1.5">
      <h3 class="font-display leading-tight font-bold text-rust" :class="centered ? 'text-base' : 'text-[clamp(1.13rem,1.85vw,1.7rem)]'">{{ item.title }}</h3>
      <p class="mt-0.5 text-sm leading-tight" :class="{ 'sm:text-base': !centered }">{{ item.description }}</p>
    </div>
  </CardDetails>
</template>
