<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import DetailDialog from '@/components/DetailDialog.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { headings, routes } from '@content/memory'

const current = ref(routes[0])
const dialog = ref(null)

function show(route) {
  current.value = route
  dialog.value.open()
}
</script>

<template>
  <section id="walking-routes" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.walkingRoutes.title" :subtitle="headings.walkingRoutes.subtitle" icon="pin" />
      <div v-reveal.stagger class="grid gap-2">
        <article v-for="route in routes" :key="route.title" class="card lift-card grid items-center gap-3 p-3 md:grid-cols-[1fr_1.1fr_auto]">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-display text-xl font-bold text-rust"><AppIcon :name="route.icon" class="mr-1 text-gold" />{{ route.title }}</h3>
              <span class="rounded-full bg-sand px-2 text-xs text-gold">{{ route.duration }}</span>
            </div>
            <p class="mt-1 text-sm">{{ route.description }}</p>
          </div>
          <ol class="flex justify-between gap-1 text-center text-xs">
            <li v-for="stop in route.stops" :key="stop" class="flex flex-1 flex-col items-center gap-1">
              <span class="size-2 rounded-full border border-gold bg-sand" aria-hidden="true"></span>{{ stop }}
            </li>
          </ol>
          <button type="button" class="btn btn-gold btn-round justify-self-start text-sm" @click="show(route)">查看路线 <AppIcon name="arrow" /></button>
        </article>
      </div>
      <DetailDialog ref="dialog" :title="current.title">
        <p class="font-bold text-gold">{{ current.duration }} · {{ current.stops.join(' → ') }}</p>
        <p class="mt-2">{{ current.detail }}</p>
        <RouterLink to="/guide#map" class="btn btn-primary mt-4" @click="dialog.close()"><AppIcon name="pin" /> 查看茶馆位置</RouterLink>
      </DetailDialog>
    </div>
  </section>
</template>
