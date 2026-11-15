<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BanquetPromotion from '@/components/BanquetPromotion.vue'
import CardDetails from '@/components/CardDetails.vue'
import LocationMap from '@/components/LocationMap.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TravelCard from './components/TravelCard.vue'
import { siteName } from '@content/site'
import { headings, hero, locationMapAlt, storeDescription, storeInfo, townDescription, travel } from '@content/guide'
</script>

<template>
  <PageHero variant="guide" :title="hero.title" :subtitle="hero.subtitle">
    {{ hero.description }}
  </PageHero>

  <section class="page-section band">
    <div v-reveal.stagger class="site-shell grid gap-4 lg:grid-cols-[.75fr_1fr]">
      <div class="ink-landscape flex gap-3 p-2 sm:gap-5">
        <div class="hidden items-start gap-1 sm:flex">
          <span class="seal mt-3">三江</span>
          <h2 class="brush text-[clamp(2.5rem,4.4vw,4.4rem)] text-rust [writing-mode:vertical-rl]">{{ headings.store.title }}</h2>
        </div>
        <div>
          <h2 class="brush text-[clamp(1.9rem,3vw,3rem)] text-rust">{{ siteName }}</h2>
          <p class="mt-2">{{ storeDescription }}</p>
          <RouterLink to="#map" class="btn btn-primary btn-round mt-4"><AppIcon name="pin" /> 查看位置地图</RouterLink>
        </div>
      </div>
      <dl class="card grid gap-x-4 gap-y-3 p-4 sm:grid-cols-2">
        <div v-for="item in storeInfo" :key="item.title" class="flex items-start gap-3 border-b border-line/60 pb-2">
          <AppIcon :name="item.icon" class="mt-1 text-3xl text-rust" />
          <div><dt class="font-display text-xl font-bold text-rust">{{ item.title }}</dt><dd class="text-sm leading-snug sm:text-base">{{ item.text }}</dd></div>
        </div>
      </dl>
    </div>
  </section>

  <section id="map" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.map.title" :subtitle="headings.map.subtitle" centered />
      <CardDetails v-reveal title="三江镇（三江口）" :description="townDescription" file="location.png" :alt="locationMapAlt"
        class="card grid gap-3 p-2.5 md:grid-cols-[.24fr_1fr]">
        <div class="ink-landscape px-3 py-4">
          <h3 class="brush text-[clamp(1.9rem,3.3vw,3.1rem)] leading-tight text-rust">三江镇<br class="hidden md:block" /><span class="text-[.76em] whitespace-nowrap">（三江口）</span></h3>
          <p class="mt-2">{{ townDescription }}</p>
        </div>
        <LocationMap static-image />
      </CardDetails>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.travel.title" :subtitle="headings.travel.subtitle" centered />
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-3"><TravelCard v-for="item in travel" :key="item.title" :item="item" /></div>
    </div>
  </section>

  <div class="page-section band">
    <BanquetPromotion class="site-shell" />
  </div>
</template>
