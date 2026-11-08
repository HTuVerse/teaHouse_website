<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import BanquetPromotion from '@/components/BanquetPromotion.vue'
import DetailDialog from '@/components/DetailDialog.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { media } from '@/site'
import { headings, homeTeas } from '@content/home'

const selected = ref(homeTeas[0])
const dialog = ref(null)

function show(tea) {
  selected.value = tea
  dialog.value.open()
}
</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.signatureMenu.title" :subtitle="headings.signatureMenu.subtitle" icon="leaf">
        <RouterLink to="/menu" class="text-link whitespace-nowrap text-sm">查看更多菜单 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <div v-reveal.stagger class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        <article v-for="tea in homeTeas" :key="tea.title" class="card lift-card relative flex min-w-0 flex-col p-1.5">
          <PhotoPreview :src="media(tea.image + '.jpg')" :alt="tea.title" class="aspect-[1.65] rounded-lg" />
          <span class="pointer-events-none absolute top-2.5 left-2.5 rounded-full bg-rust/95 px-2 py-0.5 text-xs text-white">{{ tea.badge }}</span>
          <div class="flex flex-1 flex-col px-1.5 pt-1 pb-0.5">
            <h3 class="font-display text-lg leading-tight font-bold xl:text-xl">{{ tea.title }}</h3>
            <p class="mt-1 mb-2 text-sm leading-snug">{{ tea.description }}</p>
            <button type="button" class="round-link mt-auto self-end" :aria-label="'查看' + tea.title" @click="show(tea)"><AppIcon name="plus" /></button>
          </div>
        </article>
      </div>
      <BanquetPromotion class="mt-5 sm:mt-6" />
      <DetailDialog ref="dialog" :title="selected.title">
        <img :src="media(selected.image + '.jpg')" :alt="selected.title" class="mb-3 aspect-[2.1] w-full rounded-lg object-cover" loading="lazy" />
        <p>{{ selected.description }}</p>
        <RouterLink to="/menu" class="btn btn-primary mt-4" @click="dialog.close()">查看菜单 <AppIcon name="arrow" /></RouterLink>
      </DetailDialog>
    </div>
  </section>
</template>
