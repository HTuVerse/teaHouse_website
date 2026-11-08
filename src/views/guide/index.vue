<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BanquetPromotion from '@/components/BanquetPromotion.vue'
import LocationMap from '@/components/LocationMap.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TravelCard from './components/TravelCard.vue'
import { media } from '@/site'
import { siteName } from '@content/site'
import { headings, hero, neighbors, storeDescription, storeInfo, townDescription, travel } from '@content/guide'
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
      <div v-reveal class="card grid gap-3 p-2.5 md:grid-cols-[.24fr_1fr]">
        <div class="ink-landscape px-3 py-4">
          <h3 class="brush text-[clamp(1.9rem,3.3vw,3.1rem)] leading-tight text-rust">三江镇<br class="hidden md:block" /><span class="text-[.76em] whitespace-nowrap">（三江口）</span></h3>
          <p class="mt-2">{{ townDescription }}</p>
        </div>
        <LocationMap />
      </div>
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

  <section class="page-section band">
    <div class="site-shell grid gap-3 lg:grid-cols-[.2fr_1fr]">
      <div v-reveal class="ink-landscape p-2">
        <h2 class="brush text-[clamp(2rem,3.7vw,3.6rem)] leading-tight text-rust">{{ headings.neighbors.title }}</h2>
        <p class="mt-2">逛街 ＋ 喝茶<br />感受三江口烟火与人文</p>
      </div>
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-2">
        <article v-for="place in neighbors" :key="place.title" class="card lift-card grid grid-cols-[1fr_.85fr] gap-3 p-2.5">
          <img :src="media(place.image + '.jpg')" :alt="place.title" class="h-full min-h-34 w-full rounded-md object-cover" loading="lazy" />
          <div class="flex flex-col items-start">
            <h3 class="font-display text-xl leading-tight font-bold text-rust">{{ place.title }}</h3>
            <p class="mt-1 mb-2 text-sm leading-snug">{{ place.text }}</p>
            <RouterLink :to="place.to" class="btn btn-primary btn-round mt-auto text-sm">了解更多 <AppIcon name="arrow" /></RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
