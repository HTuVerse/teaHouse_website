<script setup>
import AppIcon from '@/components/AppIcon.vue'
import CardDetails from '@/components/CardDetails.vue'
import CardPhoto from '@/components/CardPhoto.vue'
import FeatureStrip from '@/components/FeatureStrip.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import SanjiangCulture from './components/SanjiangCulture.vue'
import TeaHouseSpaces from './components/TeaHouseSpaces.vue'
import SignatureMenu from './components/SignatureMenu.vue'
import { headings, heritage, hero, reviews, townFacts } from '@content/home'
import { media } from '@/site'
</script>

<template>
  <PageHero variant="home" :title="hero.title" :subtitle="hero.subtitle">
    {{ hero.description }}
    <template #actions>
      <RouterLink to="#tea-house-spaces" class="btn btn-primary btn-round">了解乌龙街老茶馆 <AppIcon name="arrow" /></RouterLink>
    </template>
  </PageHero>
  <FeatureStrip :items="townFacts" />

  <TeaHouseSpaces />
  <SignatureMenu />

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.heritage.title" :subtitle="headings.heritage.subtitle" icon="pavilion">
        <RouterLink to="/wulong-memory" class="text-link whitespace-nowrap text-sm">查看三江周边景点 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <div v-reveal.stagger class="grid gap-x-5 gap-y-4 md:grid-cols-3">
        <CardDetails v-for="item in heritage" :key="item.title" :title="item.title"
          :description="item.description" :file="item.image" :alt="item.alt" class="min-w-0 rounded-lg">
          <CardPhoto :item="item" class="aspect-[2.5] rounded-lg" />
          <h3 class="mt-1 font-display text-xl font-bold">{{ item.title }}</h3>
          <p class="mt-1 text-sm leading-snug sm:text-base">{{ item.description }}</p>
        </CardDetails>
      </div>
    </div>
  </section>

  <SanjiangCulture />

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.reviews.title" :subtitle="headings.reviews.subtitle" icon="quote" />
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-3">
        <CardDetails v-for="review in reviews" :key="review.name" :title="review.name" :file="review.avatar"
          class="card lift-card grid grid-cols-[3rem_1fr] items-start gap-3 p-3">
          <img :src="media(review.avatar)" alt="" width="48" height="48" class="size-12 rounded-full bg-sand object-cover" loading="lazy" />
          <div>
            <p class="flex flex-wrap items-center gap-1.5"><strong>{{ review.name }}</strong><span class="rounded-full bg-sand px-2 text-xs">{{ review.from }}</span></p>
            <blockquote class="mt-1 text-sm leading-snug">“{{ review.text }}”</blockquote>
            <p class="mt-0.5 tracking-widest text-rust" aria-label="五星">★★★★★</p>
          </div>
          <template #description>
            <p class="mb-1 text-sm">{{ review.from }} <span class="ml-1 tracking-widest text-rust" aria-label="五星">★★★★★</span></p>
            <blockquote>“{{ review.text }}”</blockquote>
          </template>
        </CardDetails>
      </div>
    </div>
  </section>
</template>
