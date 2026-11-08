<script setup>
import { nextTick, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import DetailDialog from './DetailDialog.vue'

defineOptions({ inheritAttrs: false })
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  title: String,
  imageClass: String,
  previewLabel: String,
})

const hasOpened = ref(false)
const dialog = ref(null)
const fullscreen = ref(null)
let pressedAt = null
let contextMenuOpened = false

async function open() {
  if (!hasOpened.value) {
    hasOpened.value = true
    await nextTick()
  }
  dialog.value?.open()
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
</script>

<template>
  <button v-bind="$attrs" type="button"
    :class="{ 'photo-trigger relative block w-full cursor-zoom-in overflow-hidden focus-visible:-outline-offset-2 focus-visible:outline-white': !$slots.default }"
    :aria-label="$slots.default ? undefined : '放大查看' + (title || alt)" aria-haspopup="dialog" @click="open">
    <slot>
      <img :src="src" :alt="alt" :class="imageClass" class="block h-full w-full object-cover" loading="lazy" />
      <span aria-hidden="true" :class="previewLabel
        ? 'pointer-events-none absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-ink/90 px-2.5 py-1 text-sm text-white'
        : 'photo-cue'">
        <AppIcon name="expand" />{{ previewLabel }}
      </span>
    </slot>
  </button>

  <template v-if="hasOpened">
    <DetailDialog ref="dialog" :title="title || alt" :aria-label="'图片预览 · ' + (title || alt)"
      class="w-[min(94vw,70rem)]">
      <button type="button" class="mx-auto block w-fit max-w-full cursor-zoom-in rounded-md" aria-haspopup="dialog"
        :aria-label="'全屏查看' + (title || alt)" @click="openFullscreen">
        <img :src="src" :alt="alt" class="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-md object-contain" />
      </button>
      <p class="mt-2 text-center text-sm text-ink-soft">点图片全屏查看，长按可保存</p>
    </DetailDialog>

    <dialog ref="fullscreen" :aria-label="'全屏看图 · ' + (title || alt)"
      class="photo-fullscreen fixed inset-0 m-0 grid h-dvh max-h-none w-full max-w-none place-items-center overflow-hidden bg-black not-open:hidden">
      <img :src="src" :alt="alt" role="button" tabindex="0" autofocus :aria-label="'退出全屏看图 · ' + (title || alt)"
        class="max-h-dvh max-w-full cursor-zoom-out object-contain focus-visible:-outline-offset-2 focus-visible:outline-white"
        @pointerdown="startPress" @contextmenu="contextMenuOpened = true" @click="exitOnTap"
        @keydown.enter.space.prevent="fullscreen.close()" />
    </dialog>
  </template>
</template>
