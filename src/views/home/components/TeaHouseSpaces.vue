<script setup>
import SectionHeading from '@/components/SectionHeading.vue'
import ImageCard from '@/components/ImageCard.vue'
import { headings, spaces } from '@content/home'
</script>

<template>
  <section id="tea-house-spaces" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.spaces.title" :subtitle="headings.spaces.subtitle" centered />
      <div v-reveal.stagger class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <ImageCard v-for="space in spaces" :key="space.title" :item="space" />
      </div>
    </div>
  </section>
</template>
