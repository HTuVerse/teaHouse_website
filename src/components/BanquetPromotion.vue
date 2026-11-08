<script setup>
import AppIcon from './AppIcon.vue'
import PhotoPreview from './PhotoPreview.vue'
import { media } from '@/site'
import { phone, phoneLink } from '@content/site'
import { banquet, services } from '@content/banquet'
</script>

<template>
  <section v-reveal class="card overflow-hidden" aria-labelledby="banquet-promotion-title">
    <div class="grid lg:grid-cols-[.85fr_1.15fr]">
      <div class="grid gap-2 bg-sand p-2.5 sm:p-3 lg:grid-rows-[1fr_auto]">
        <figure class="relative min-h-0 overflow-hidden rounded-lg lg:min-h-56">
          <PhotoPreview :src="media('hall.jpg')" title="茶馆大堂" alt="三江乌龙街老茶馆大堂里，红灯笼下的宾客围桌相聚"
            class="aspect-[1.9] lg:absolute lg:inset-0 lg:aspect-auto" image-class="object-[center_65%]" />
          <figcaption class="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-6 pb-2 text-sm font-bold tracking-wider text-[#fff5e3]">
            {{ banquet.hallCaption }}
          </figcaption>
        </figure>
        <div class="grid grid-cols-2 gap-2">
          <PhotoPreview :src="media('sanjiang-pairing.jpg')" alt="空心菜、马蹄、腌萝卜和一杯茶" class="aspect-[2.25] rounded-md" />
          <PhotoPreview :src="media('stage.jpg')" alt="老茶馆的乡土舞台与竹木座席" class="aspect-[2.25] rounded-md" />
        </div>
      </div>

      <div class="px-4 py-5 sm:px-6 lg:px-7">
        <p class="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-rust"><AppIcon name="pavilion" class="text-gold" /> {{ banquet.eyebrow }}</p>
        <h2 id="banquet-promotion-title" class="brush text-[clamp(1.85rem,3.25vw,3.6rem)] leading-tight text-rust">
          <span class="inline-block">{{ banquet.titleFirstLine }}</span><span class="inline-block">{{ banquet.titleSecondLine }}</span>
        </h2>
        <p class="mt-2 text-base font-bold sm:text-lg">{{ banquet.tagline }}</p>
        <p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{{ banquet.description }}</p>
        <p class="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">{{ banquet.occasions }}</p>

        <ul class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <li v-for="service in services" :key="service.title" class="rounded-md border border-line/80 bg-sand/40 px-2 py-2 sm:px-3">
            <strong class="flex items-center gap-1 text-sm text-rust sm:text-base"><AppIcon :name="service.icon" class="text-gold" />{{ service.title }}</strong>
            <p class="mt-0.5 text-xs text-ink-soft sm:text-sm">{{ service.description }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 bg-rust px-4 py-4 text-[#fff6e8] sm:px-6 lg:px-7">
      <div>
        <p class="text-base font-bold sm:text-lg">{{ banquet.invitation }}</p>
        <p class="mt-0.5 text-sm text-[#f7e5cd]">{{ banquet.bookingHint }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <a :href="phoneLink" class="btn btn-round bg-[#fff2dc] py-2 text-rust hover:bg-sand focus-visible:outline-[#fff2dc]">
          <AppIcon name="phone" /> {{ banquet.bookingAction }}
        </a>
        <span class="text-sm font-bold whitespace-nowrap tabular-nums">{{ phone }}</span>
      </div>
    </div>
  </section>
</template>
