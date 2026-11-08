<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'

defineProps({ title: { type: String, required: true } })
const panel = ref(null)
defineExpose({
  open() {
    if (!panel.value.open) panel.value.showModal()
  },
  close: () => panel.value.close(),
})
</script>

<template>
  <dialog ref="panel" class="detail-dialog card" aria-label="详细内容" @click.self="panel.close()">
    <div class="p-5 sm:p-6">
      <div class="mb-3 flex items-start justify-between gap-4">
        <h2 class="brush text-3xl text-ink">{{ title }}</h2>
        <button type="button" autofocus aria-label="关闭" class="icon-control grid size-9 shrink-0 place-items-center rounded-full border border-line text-rust hover:bg-sand" @click="panel.close()">
          <AppIcon name="close" />
        </button>
      </div>
      <slot />
    </div>
  </dialog>
</template>
