<script setup>
import { useRoute } from 'vue-router'
import { navigation } from '@content/site'
import AppIcon from './AppIcon.vue'

const route = useRoute()

function currentState(link, isExactActive) {
  if (isExactActive) return 'page'
  if (link.to === '/activities' && route.name === 'activity-detail') return 'location'
}
</script>

<template>
  <nav aria-label="移动端底部导航"
    class="fixed inset-x-0 bottom-0 z-20 grid h-(--mobile-tab-bar-height) grid-cols-5 border-t border-line bg-paper
      pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]
      shadow-[0_-4px_16px_#39201612] lg:hidden">
    <RouterLink v-for="link in navigation" :key="link.to" :to="link.to" custom v-slot="{ href, navigate, isExactActive }">
      <a :href="href" :aria-current="currentState(link, isExactActive)" @click="navigate"
        class="group flex min-w-0 flex-col items-center justify-center gap-0.5 text-center text-[0.6875rem] leading-tight
          font-bold text-ink-soft aria-[current]:text-rust focus-visible:-outline-offset-2">
        <span class="grid h-7 w-10 place-items-center rounded-full group-aria-[current]:bg-sand">
          <AppIcon :name="link.icon" class="text-lg" />
        </span>
        <span>{{ link.label }}</span>
      </a>
    </RouterLink>
  </nav>
</template>
