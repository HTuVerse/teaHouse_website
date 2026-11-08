<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { navigation } from '@content/site'
import SiteBrand from './SiteBrand.vue'
import SiteShare from './SiteShare.vue'
import AppIcon from './AppIcon.vue'

const route = useRoute()
const expanded = ref(false)
const hidden = ref(false)
const menuToggle = ref(null)
const { userAgent, maxTouchPoints } = navigator
const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent)
  || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)
let scrollEdge = 0

function scrollPosition() {
  const page = document.scrollingElement
  const maxScroll = Math.max(0, page.scrollHeight - page.clientHeight)
  return Math.max(0, Math.min(window.scrollY, maxScroll))
}

function updateHeader() {
  const y = scrollPosition()
  if (y <= 4 || (expanded.value && menuToggle.value?.offsetWidth)) {
    hidden.value = false
    scrollEdge = y
    return
  }

  // Measure from the last peak or trough so tiny scroll reversals don't flicker.
  scrollEdge = hidden.value ? Math.max(scrollEdge, y) : Math.min(scrollEdge, y)
  const distance = hidden.value ? scrollEdge - y : y - scrollEdge
  if (distance >= (hidden.value ? 6 : 12)) {
    hidden.value = !hidden.value
    scrollEdge = y
  }
}

onMounted(() => {
  scrollEdge = scrollPosition()
  window.addEventListener('scroll', updateHeader, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', updateHeader))

watch(() => route.fullPath, () => { expanded.value = false })
watch(() => route.path, () => {
  hidden.value = false
  scrollEdge = scrollPosition()
})

function toggleMenu() {
  expanded.value = !expanded.value
  hidden.value = false
  scrollEdge = scrollPosition()
}

function closeMenu() {
  expanded.value = false
  menuToggle.value?.focus()
}

function active(link) {
  const path = route.path.replace(/\.html$/, '').replace(/^\/index$/, '/')
  return link.to === path
}
</script>

<template>
  <header id="site-header" class="site-header sticky top-0 z-10 border-b border-line/75 bg-paper/95 pt-[env(safe-area-inset-top)]"
    :class="{ 'is-hidden': hidden }">
    <div class="site-shell flex min-h-16 items-center justify-between lg:min-h-[74px]" :class="isMobile ? 'gap-2' : 'gap-4'">
      <SiteBrand :class="isMobile && '[&>svg]:max-sm:w-9 [&>svg]:max-[360px]:hidden'" />
      <nav aria-label="主导航" class="hidden items-center gap-[clamp(1.4rem,3vw,3rem)] lg:flex">
        <RouterLink v-for="link in navigation" :key="link.to" :to="link.to"
          class="nav-link whitespace-nowrap py-2 text-[clamp(.8rem,1.15vw,1rem)] font-bold" :class="{ 'is-current': active(link) }"
          :aria-current="active(link) ? 'page' : undefined">
          {{ link.label }}
        </RouterLink>
      </nav>
      <div class="flex shrink-0 items-center gap-1.5" :class="{ 'lg:hidden': !isMobile }">
        <SiteShare v-if="isMobile" />
        <button ref="menuToggle" class="icon-control grid size-11 place-items-center rounded-md border border-line text-xl text-rust lg:hidden" type="button"
          aria-label="菜单" aria-controls="mobile-nav" :aria-expanded="expanded" @click="toggleMenu">
          <AppIcon :key="expanded" :name="expanded ? 'close' : 'menu'" class="icon-swap" />
        </button>
      </div>
    </div>
    <Transition name="mobile-nav">
      <div v-show="expanded" :inert="!expanded" class="absolute inset-x-0 top-full bg-paper lg:hidden">
        <div class="mobile-nav-clip">
          <nav id="mobile-nav" aria-label="移动端主导航" class="site-shell grid grid-cols-2 gap-2 border-t border-line py-3"
            @keydown.esc="closeMenu">
            <RouterLink v-for="link in navigation" :key="link.to" :to="link.to" class="mobile-nav-link rounded px-3 py-2 font-bold hover:bg-sand"
              :class="{ 'text-rust bg-sand': active(link) }" :aria-current="active(link) ? 'page' : undefined" @click="expanded = false">
              {{ link.label }}
            </RouterLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>
