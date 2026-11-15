<script setup>
import { computed, ref } from 'vue'
import { media } from '@/site'
import PhotoDialog from './PhotoDialog.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: String,
  file: String,
  alt: String,
  photos: { type: Array, default: () => [] },
})

const dialog = ref(null)
const gallery = computed(() => {
  const photos = props.file
    ? [{ file: props.file, alt: props.alt ?? props.title }, ...props.photos]
    : props.photos
  return photos.map(({ file, alt }) => ({ src: media(file), alt }))
})
</script>

<template>
  <article class="relative isolate">
    <slot />
    <button type="button" class="absolute inset-0 z-10 size-full cursor-pointer rounded-[inherit] outline-offset-[-3px]"
      :aria-label="'查看详情 · ' + title" aria-haspopup="dialog" @click="dialog.open()" />
    <PhotoDialog ref="dialog" :title="title" :label="'详情 · ' + title" :photos="gallery">
      <template #description>
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </template>
      <template v-if="$slots.actions" #actions="{ close }">
        <slot name="actions" :close="close" />
      </template>
    </PhotoDialog>
  </article>
</template>
