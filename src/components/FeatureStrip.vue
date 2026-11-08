<script setup>
import AppIcon from './AppIcon.vue'
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <div class="border-b border-white/85 bg-paper/35">
    <ul v-reveal.stagger class="site-shell feature-strip grid grid-cols-2 py-2.5 sm:grid-cols-4 sm:py-3">
      <li v-for="item in items" :key="item.label" class="font-display flex items-center justify-center gap-2 px-1 py-1.5 text-center text-[clamp(1rem,1.75vw,1.5rem)] font-bold text-ink sm:gap-3">
        <AppIcon :name="item.icon" class="text-[1.35em] text-rust" />{{ item.label }}
      </li>
    </ul>
  </div>
</template>
