<script setup>
import AppIcon from '@/components/AppIcon.vue'
import AttractionCard from '@/components/AttractionCard.vue'
import CardDetails from '@/components/CardDetails.vue'
import CardPhoto from '@/components/CardPhoto.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TwoRowScroll from '@/components/TwoRowScroll.vue'
import { headings, sanjiangDailyLife } from '@content/home'
import { attractionGroups } from '@content/memory'

const availableAttractions = attractionGroups.flatMap((group) => group.places)
const landmarks = []
while (landmarks.length < 3 && availableAttractions.length > 0) {
  const index = Math.floor(Math.random() * availableAttractions.length)
  const [place] = availableAttractions.splice(index, 1)
  landmarks.push(place)
}
</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.dailyLife.title" :subtitle="headings.dailyLife.subtitle" centered />
      <TwoRowScroll :aria-label="headings.dailyLife.title" grid-class="gap-3 md:grid-cols-2 lg:grid-cols-4">
        <CardDetails v-for="item in sanjiangDailyLife" :key="item.title" :title="item.title"
          :description="item.detail || item.description" :file="item.image" :alt="item.alt" :photos="item.photos"
          class="card lift-card min-w-0 p-1.5">
          <CardPhoto :item="item" class="aspect-[2.5] rounded-lg" />
          <div class="px-2 pt-1.5 pb-2">
            <h3 class="flex items-start gap-1.5 text-lg leading-snug font-bold text-rust xl:text-xl">
              <AppIcon :name="item.icon" class="mt-0.5" />{{ item.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">{{ item.description }}</p>
          </div>
        </CardDetails>
      </TwoRowScroll>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.landmarks.title" :subtitle="headings.landmarks.subtitle" centered />
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-3">
        <AttractionCard v-for="place in landmarks" :key="place.id" :place="place"
          class="landmark-card attractions-card--compact" />
      </div>
      <div class="mt-4 flex justify-center">
        <RouterLink :to="{ name: 'memory' }" class="btn btn-primary btn-round">
          走进乌龙街记忆 <AppIcon name="arrow" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landmark-card :deep(.attractions-photo) {
  width: 100%;
  aspect-ratio: 2 / 1;
  max-height: 8rem;
}
</style>
