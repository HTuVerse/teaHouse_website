<script setup>
import { computed, nextTick, ref } from 'vue'
import DetailDialog from './DetailDialog.vue'

const props = defineProps({
  title: { type: String, required: true },
  label: { type: String, required: true },
  photos: { type: Array, required: true },
})

const selected = ref(0)
const previewPhoto = computed(() => props.photos[selected.value])
const hasOpened = ref(false)
const dialog = ref(null)
const fullscreen = ref(null)
let pressedAt = null
let contextMenuOpened = false

async function open(src) {
  selected.value = Math.max(0, props.photos.findIndex((photo) => photo.src === src))
  hasOpened.value = true
  await nextTick()
  dialog.value?.open()
}

function close() {
  dialog.value?.close()
}

function openFullscreen() {
  pressedAt = null
  contextMenuOpened = false
  fullscreen.value.showModal()
}

function startPress(event) {
  pressedAt = event.timeStamp
  contextMenuOpened = false
}

function exitOnTap(event) {
  const held = pressedAt !== null && event.timeStamp - pressedAt >= 450
  if (event.detail > 0 && (held || contextMenuOpened)) return
  fullscreen.value.close()
}

defineExpose({ open, close })
</script>

<template>
  <Teleport v-if="hasOpened" to="body">
    <DetailDialog ref="dialog" :title="title" :aria-label="label"
      :class="$slots.description ? 'w-[min(94vw,54rem)]' : 'w-[min(94vw,70rem)]'">
      <div v-if="$slots.description" class="mb-4 leading-relaxed text-ink-soft">
        <slot name="description" />
      </div>
      <button type="button" class="mx-auto block w-fit max-w-full cursor-zoom-in rounded-md" aria-haspopup="dialog"
        :aria-label="'全屏查看 · ' + previewPhoto.alt" @click="openFullscreen">
        <img :src="previewPhoto.src" :alt="previewPhoto.alt"
          :class="photos.length > 1 || $slots.description ? 'max-h-[60dvh]' : 'max-h-[calc(100dvh-10rem)]'"
          class="mx-auto w-auto max-w-full rounded-md object-contain" />
      </button>
      <div v-if="photos.length > 1" role="group" aria-label="全部照片" class="mt-3 flex flex-wrap justify-center gap-2">
        <button v-for="(photo, index) in photos" :key="photo.src" type="button"
          class="h-12 w-18 overflow-hidden rounded-md border-2 p-0.5 hover:border-gold focus-visible:outline-rust"
          :class="selected === index ? 'border-rust' : 'border-transparent'"
          :aria-label="'查看 · ' + photo.alt" :aria-pressed="selected === index" @click="selected = index">
          <img :src="photo.src" alt="" class="size-full rounded-sm object-cover" />
        </button>
      </div>
      <p class="mt-2 text-center text-sm text-ink-soft">点图片全屏查看，长按可保存</p>
      <slot name="actions" :close="close" />
    </DetailDialog>

    <dialog ref="fullscreen" :aria-label="'全屏看图 · ' + title"
      class="photo-fullscreen fixed inset-0 m-0 grid h-dvh max-h-none w-full max-w-none place-items-center overflow-hidden bg-black not-open:hidden">
      <img :src="previewPhoto.src" :alt="previewPhoto.alt" role="button" tabindex="0" autofocus :aria-label="'退出全屏看图 · ' + title"
        class="max-h-dvh max-w-full cursor-zoom-out object-contain focus-visible:-outline-offset-2 focus-visible:outline-white"
        @pointerdown="startPress" @contextmenu="contextMenuOpened = true" @click="exitOnTap"
        @keydown.enter.space.prevent="fullscreen.close()" />
    </dialog>
  </Teleport>
</template>
