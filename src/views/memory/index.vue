<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailDialog from '@/components/DetailDialog.vue'
import ImageCard from '@/components/ImageCard.vue'
import PageHero from '@/components/PageHero.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import WalkingRoutes from './components/WalkingRoutes.vue'
import { media } from '@/site'
import { headings, hero, impressions, localFlavors, photos, stories } from '@content/memory'

const current = ref(impressions[0])
const dialog = ref(null)

function show(item) {
  current.value = item
  dialog.value.open()
}
</script>

<template>
  <PageHero :title="hero.title" :seal="hero.seal" :background-image="hero.backgroundImage">
    {{ hero.description }}
    <template #actions>
      <RouterLink to="#impressions" class="btn btn-primary btn-round"><AppIcon name="arrow" /> 走进乌龙街记忆</RouterLink>
    </template>
  </PageHero>

  <section id="impressions" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.impressions.title" :subtitle="headings.impressions.subtitle" icon="pavilion">
        <RouterLink to="#walking-routes" class="text-link text-sm">查看游览路线 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <ImageCard v-for="item in impressions" :key="item.title" :item="item">
          <div class="mt-1 flex justify-end">
            <button type="button" class="round-link" :aria-label="'查看' + item.title" @click="show(item)"><AppIcon name="arrow" /></button>
          </div>
        </ImageCard>
      </div>
    </div>
  </section>

  <section id="culture-stories" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.stories.title" :subtitle="headings.stories.subtitle" icon="book" />
      <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <ImageCard v-for="item in stories" :key="item.title" :item="item" image-class="aspect-[2.45]">
          <div class="mt-1 flex justify-end">
            <button type="button" class="round-link" :aria-label="'查看' + item.title" @click="show(item)"><AppIcon name="arrow" /></button>
          </div>
        </ImageCard>
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.localFlavors.title" :subtitle="headings.localFlavors.subtitle" icon="leaf">
        <RouterLink to="/menu" class="text-link text-sm">查看菜单与点心 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <div v-reveal.stagger class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <ImageCard v-for="item in localFlavors" :key="item.title" :item="item" image-class="aspect-[2.65]" />
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.gallery.title" :subtitle="headings.gallery.subtitle" icon="photo" />
      <div v-reveal.stagger class="grid gap-3 sm:grid-cols-3">
        <ImageCard v-for="photo in photos" :key="photo.image" :item="photo" />
      </div>
    </div>
  </section>

  <WalkingRoutes />
  <DetailDialog ref="dialog" :title="current.title">
    <img :src="media(current.image + '.jpg')" :alt="current.title" class="mb-3 max-h-[60dvh] w-full rounded-lg object-contain" loading="lazy" />
    <p>{{ current.description }}</p>
  </DetailDialog>
</template>
