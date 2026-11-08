<script setup>
import { headings } from '@content/home'
import AppIcon from '@/components/AppIcon.vue'
import LocationMap from '@/components/LocationMap.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { address, hours, phone, phoneLink } from '@content/site'
</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.visit.title" :subtitle="headings.visit.subtitle" icon="pin">
        <RouterLink to="/guide" class="text-link text-sm">查看到店指南 <AppIcon name="arrow" /></RouterLink>
      </SectionHeading>
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-[.94fr_1.06fr]">
        <dl class="card ink-landscape grid content-center gap-2 p-3.5 sm:p-4">
          <div class="flex items-start gap-2"><AppIcon name="pin" class="mt-1 text-gold" /><div><dt class="font-bold text-rust">地址</dt><dd>{{ address }}</dd></div></div>
          <div class="flex items-start gap-2"><AppIcon name="clock" class="mt-1 text-gold" /><div><dt class="font-bold text-rust">营业时间</dt><dd>{{ hours }}</dd></div></div>
          <div class="flex items-start gap-2"><AppIcon name="phone" class="mt-1 text-gold" /><div><dt class="font-bold text-rust">联系电话</dt><dd><a :href="phoneLink" class="hover:underline">{{ phone }}</a></dd></div></div>
        </dl>
        <LocationMap compact />
      </div>
    </div>
  </section>
</template>
