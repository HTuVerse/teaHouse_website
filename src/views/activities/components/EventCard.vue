<script setup>
import AppIcon from '@/components/AppIcon.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import { media } from '@/site'
import { eventDateLabel } from '../dates'

defineProps({ event: { type: Object, required: true } })
</script>

<template>
  <article :id="'event-' + event.id" class="card lift-card relative flex h-full min-w-0 scroll-mt-4 flex-col gap-2 p-1.5 hover:border-gold">
    <PhotoPreview :src="media(event.image)" :alt="event.title + '封面'" :title="event.title"
      :image-class="event.imagePosition" class="aspect-[2.4] shrink-0 rounded-lg" preview-label="预览大图" />
    <span class="pointer-events-none absolute top-3 left-3 rounded-full bg-rust px-2.5 py-0.5 text-sm text-white">{{ event.badge }}</span>
    <RouterLink :to="{ name: 'activity-detail', params: { eventId: event.id } }"
      class="group flex flex-1 flex-col rounded-md px-2.5 pt-0.5 pb-2">
      <h3 class="font-display text-xl leading-tight font-bold">{{ event.title }}</h3>
      <p class="mt-1 text-sm font-bold text-rust"><AppIcon name="calendar" class="mr-1 text-gold" />{{ eventDateLabel(event) }} <span v-if="event.time">{{ event.time }}</span></p>
      <p class="mt-1 mb-2 text-sm leading-snug">{{ event.description }}</p>
      <span class="text-link mt-auto self-start text-sm group-hover:underline">查看详情 <AppIcon name="arrow" /></span>
    </RouterLink>
  </article>
</template>
