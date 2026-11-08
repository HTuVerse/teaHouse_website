<script setup>
import { address, footerCaption, navigation, phone, phoneLink, siteName } from '@content/site'
import SiteBrand from './SiteBrand.vue'

const linkStyle = 'py-0.5 hover:underline focus-visible:outline-[#ebcf9d]'
</script>

<template>
  <footer class="bg-pine text-[#f4e7cc]">
    <div v-reveal.stagger class="site-shell grid items-center gap-x-6 gap-y-2 py-2.5 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
      <SiteBrand light compact class="justify-self-start focus-visible:outline-[#ebcf9d]">
        <template #caption>{{ footerCaption }}</template>
      </SiteBrand>

      <nav aria-label="页脚导航" class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm lg:justify-center lg:gap-x-4">
        <RouterLink v-for="link in navigation" :key="link.to" :to="link.to" :class="linkStyle">{{ link.label }}</RouterLink>
      </nav>

      <a :href="phoneLink" :class="linkStyle" class="justify-self-start text-sm sm:col-span-2 lg:col-span-1">{{ phone }}</a>
    </div>

    <div class="border-t border-white/15">
      <div class="site-shell flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 py-1.5 text-xs text-[#e2d7c4]">
        <span>© {{ siteName }}</span>
        <span>{{ address }}</span>
      </div>
    </div>
  </footer>
</template>
