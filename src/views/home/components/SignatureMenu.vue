<script setup>
import AppIcon from '@/components/AppIcon.vue'
import BanquetPromotion from '@/components/BanquetPromotion.vue'
import CardDetails from '@/components/CardDetails.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TwoRowScroll from '@/components/TwoRowScroll.vue'
import { media } from '@/site'
import { headings } from '@content/home'
import { teas } from '@content/menu'

</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.signatureMenu.title" :subtitle="headings.signatureMenu.subtitle" icon="leaf">
        <RouterLink to="/menu" class="text-link whitespace-nowrap text-sm">查看更多菜单 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <TwoRowScroll :aria-label="headings.signatureMenu.title"
        grid-class="grid-cols-2 gap-2.5 min-[30rem]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
        <CardDetails v-for="tea in teas" :key="tea.title" :title="tea.title" :description="tea.description"
          :file="tea.image + '.jpg'" class="card lift-card flex min-w-0 flex-col p-1.5">
          <img :src="media(tea.image + '.jpg')" :alt="tea.title" class="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
          <div class="flex flex-1 flex-col px-1.5 pt-1 pb-0.5">
            <h3 class="font-display text-lg leading-tight font-bold xl:text-xl">{{ tea.title }}</h3>
            <p class="mt-1 mb-2 text-sm leading-snug">{{ tea.description }}</p>
          </div>
          <template #actions="{ close }">
            <div class="mt-4 flex justify-end">
              <RouterLink to="/menu" class="btn btn-primary" @click="close">
                查看菜单 <AppIcon name="arrow" />
              </RouterLink>
            </div>
          </template>
        </CardDetails>
      </TwoRowScroll>
      <BanquetPromotion class="mt-5 sm:mt-6" />
    </div>
  </section>
</template>
