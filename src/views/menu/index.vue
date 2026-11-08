<script setup>
import BanquetPromotion from '@/components/BanquetPromotion.vue'
import FeatureStrip from '@/components/FeatureStrip.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import MenuItemCard from './components/MenuItemCard.vue'
import { breakfast, headings, hero, introductions, menuHighlights, pairings, snacks, teas } from '@content/menu'
import { media } from '@/site'
</script>

<template>
  <PageHero variant="menu" :title="hero.title" :subtitle="hero.subtitle">
    {{ hero.description }}
  </PageHero>
  <FeatureStrip :items="menuHighlights" />

  <section class="page-section band">
    <div class="site-shell grid gap-4 lg:grid-cols-[.58fr_1fr]">
      <div v-reveal class="ink-landscape grid gap-3 p-1 md:grid-cols-[auto_1fr]">
        <div class="flex items-start gap-2">
          <span class="seal mt-2">三江</span>
          <h2 class="brush text-4xl text-rust md:text-[clamp(2.5rem,4.1vw,4.4rem)] md:[writing-mode:vertical-rl]">{{ introductions.tea.title }}</h2>
        </div>
        <div>
          <h3 class="font-display text-xl font-bold text-rust xl:text-2xl">{{ introductions.tea.subtitle }}</h3>
          <p class="mt-2">{{ introductions.tea.description }}</p>
        </div>
      </div>
      <div v-reveal.stagger class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        <MenuItemCard v-for="tea in teas" :key="tea.title" :item="tea" portrait />
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.breakfast.title" :subtitle="headings.breakfast.subtitle" centered />
      <div class="grid gap-4 lg:grid-cols-[.32fr_1fr]">
        <article v-reveal class="flex flex-col justify-between overflow-hidden rounded-lg">
          <div class="p-2.5">
            <h3 class="brush text-[clamp(1.85rem,3.2vw,3rem)] leading-tight text-rust">{{ introductions.breakfast.title }}</h3>
            <p class="mt-2">{{ introductions.breakfast.description }}</p>
          </div>
          <img :src="media(introductions.breakfast.image)" :alt="introductions.breakfast.alt" class="mt-2 max-h-52 w-full rounded-lg object-cover object-[50%_35%]" loading="lazy" />
        </article>
        <div class="grid gap-2.5">
          <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <MenuItemCard v-for="dish in breakfast.slice(0, 3)" :key="dish.title" :item="dish" />
          </div>
          <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <MenuItemCard v-for="dish in breakfast.slice(3)" :key="dish.title" :item="dish" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.snacks.title" :subtitle="headings.snacks.subtitle" centered />
      <div class="grid gap-4 lg:grid-cols-[.23fr_1fr]">
        <div v-reveal class="ink-landscape p-2">
          <h3 class="brush text-[clamp(1.85rem,3.15vw,3rem)] text-rust">{{ headings.snacks.title }}</h3>
          <p class="mt-2">{{ introductions.snacks.description }}</p>
        </div>
        <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          <MenuItemCard v-for="snack in snacks" :key="snack.title" :item="snack" />
        </div>
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.pairings.title" :subtitle="headings.pairings.subtitle" centered />
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-3">
        <article v-for="combo in pairings" :key="combo.title" class="card lift-card overflow-hidden">
          <div class="px-3 pt-2">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="brush text-3xl text-rust">{{ combo.title }}</h3>
              <span class="rounded-full bg-rust px-2 py-0.5 text-xs text-white">{{ combo.badge }}</span>
            </div>
            <p class="mt-1">{{ combo.description }}</p>
          </div>
          <PhotoPreview :src="media(combo.image + '.jpg')" :alt="combo.title" class="mt-1 aspect-[3]" />
        </article>
      </div>
    </div>
  </section>
  <div class="page-section band">
    <BanquetPromotion class="site-shell" />
  </div>
</template>
