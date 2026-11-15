<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import PhotoDialog from './PhotoDialog.vue'

defineOptions({ inheritAttrs: false })
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  title: String,
  imageClass: String,
  previewLabel: String,
  photos: Array,
})

const dialog = ref(null)
const gallery = computed(() => props.photos?.length ? props.photos : [{ src: props.src, alt: props.alt }])
</script>

<template>
  <button v-bind="$attrs" type="button"
    :class="{ 'photo-trigger relative block w-full cursor-zoom-in overflow-hidden focus-visible:-outline-offset-2 focus-visible:outline-white': !$slots.default }"
    :aria-label="$slots.default ? undefined : '放大查看' + (title || alt)" aria-haspopup="dialog" @click="dialog.open(src)">
    <slot>
      <slot name="thumbnail">
        <img :src="src" :alt="alt" :class="imageClass" class="block h-full w-full object-cover" loading="lazy" />
      </slot>
      <span aria-hidden="true" :class="previewLabel
        ? 'pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-ink/90 px-2.5 py-1 text-sm text-white'
        : 'photo-cue'">
        <AppIcon name="expand" />{{ previewLabel }}
      </span>
    </slot>
  </button>

  <PhotoDialog ref="dialog" :title="title || alt" :label="'图片预览 · ' + (title || alt)" :photos="gallery" />
</template>
