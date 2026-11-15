<script setup>
import AppIcon from './AppIcon.vue'
import CardDetails from './CardDetails.vue'
import CardPhoto from './CardPhoto.vue'

defineProps({ item: { type: Object, required: true }, imageClass: { type: String, default: 'aspect-[1.8]' }, inset: Boolean })
</script>

<template>
  <CardDetails :title="item.title" :description="item.detail || item.description" :file="item.image + '.jpg'"
    :alt="item.alt" :photos="item.photos" class="card lift-card min-w-0 overflow-hidden" :class="{ 'p-1': inset }">
    <CardPhoto :item="item" :file="item.image + '.jpg'" :class="[imageClass, { 'rounded-lg': inset }]" />
    <div class="px-3 py-2">
      <h3 class="font-display flex items-center gap-2 text-[clamp(1.13rem,1.65vw,1.5rem)] leading-tight font-bold text-ink">
        <AppIcon v-if="item.icon" :name="item.icon" class="text-gold" />{{ item.title }}
      </h3>
      <p v-if="item.description" class="mt-1 text-[.9rem] leading-snug text-ink-soft">{{ item.description }}</p>
      <slot :item="item" />
    </div>
  </CardDetails>
</template>
