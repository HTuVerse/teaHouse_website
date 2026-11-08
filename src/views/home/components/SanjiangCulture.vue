<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailDialog from '@/components/DetailDialog.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { media } from '@/site'
import { headings, houWanVillage, morningWineStreet, sanjiangDailyLife } from '@content/home'

const villageDialog = ref(null)
const landmarks = [houWanVillage, morningWineStreet]
</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.dailyLife.title" :subtitle="headings.dailyLife.subtitle" centered />
      <div v-reveal.stagger class="grid gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
        <article v-for="item in sanjiangDailyLife" :key="item.title" class="card min-w-0 p-1.5">
          <img :src="media(item.image + '.jpg')" :alt="item.alt" class="aspect-[2.5] w-full rounded-lg object-cover" loading="lazy" />
          <div class="px-2 pt-1.5 pb-2">
            <h3 class="flex items-start gap-1.5 text-lg leading-snug font-bold text-rust xl:text-xl">
              <AppIcon :name="item.icon" class="mt-0.5" />{{ item.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.landmarks.title" :subtitle="headings.landmarks.subtitle" centered />
      <div v-reveal.stagger class="grid gap-3 lg:grid-cols-2">
        <article v-for="item in landmarks" :key="item.title" class="card lift-card grid min-w-0 gap-3 p-2 sm:grid-cols-[1.05fr_1fr]">
          <img :src="media(item.image + '.jpg')" :alt="item.alt" class="aspect-[1.86] w-full self-center rounded-lg object-cover object-[50%_36%]" loading="lazy" />
          <div class="flex flex-col items-start justify-center px-2 pb-1 sm:px-1 sm:py-1">
            <h3 class="flex items-start gap-1.5 text-xl leading-snug font-bold text-rust">
              <AppIcon :name="item.icon" class="mt-0.5" />{{ item.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">{{ item.description }}</p>
            <button v-if="item === houWanVillage" type="button" class="btn btn-primary btn-round mt-2 text-sm" @click="villageDialog.open()">
              了解后万古村 <AppIcon name="arrow" />
            </button>
            <RouterLink v-else to="/wulong-memory#walking-routes" class="btn btn-primary btn-round mt-2 text-sm">
              走进早酒文化街 <AppIcon name="arrow" />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>

    <DetailDialog ref="villageDialog" :title="houWanVillage.title">
      <img :src="media(houWanVillage.image + '.jpg')" :alt="houWanVillage.alt" class="mb-3 max-h-[60dvh] w-full rounded-lg object-contain" loading="lazy" />
      <p>{{ houWanVillage.detail }}</p>
    </DetailDialog>
  </section>
</template>
