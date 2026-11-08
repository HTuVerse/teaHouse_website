<script setup>
import MobileTabBar from '@/components/MobileTabBar.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">跳至正文</a>
  <div class="reading-progress" aria-hidden="true"></div>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <SiteFooter />
  <MobileTabBar />
</template>
