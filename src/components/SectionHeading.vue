<script setup>
import AppIcon from './AppIcon.vue'

defineProps({ title: String, subtitle: String, icon: String, centered: Boolean })
</script>

<template>
  <div v-reveal class="section-heading mb-3 flex flex-wrap items-center gap-x-3 gap-y-1" :class="{ 'is-centered': centered }">
    <span v-if="centered" class="heading-rule hidden sm:block" aria-hidden="true"></span>
    <h2 class="brush flex items-center gap-2 text-[clamp(1.65rem,2.65vw,2.55rem)] leading-tight text-ink">
      <AppIcon v-if="icon" :name="icon" class="text-gold" />{{ title }}
    </h2>
    <p v-if="subtitle" class="font-display text-[clamp(1rem,1.6vw,1.4rem)] font-bold text-ink-soft"><span class="mr-2" aria-hidden="true">·</span>{{ subtitle }}</p>
    <span class="heading-rule" aria-hidden="true"></span>
    <slot />
  </div>
</template>
