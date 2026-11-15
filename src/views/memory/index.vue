<script setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import AttractionCard from '@/components/AttractionCard.vue'
import WalkingRoutes from './components/WalkingRoutes.vue'
import { vScrollPageAtEdge } from '@/scrollPageAtEdge'
import { media } from '@/site'
import { attractionGroups } from '@content/memory'

const artsGroup = attractionGroups.find((group) => group.id === 'arts-history')
const park = artsGroup.places.find((place) => place.id === 'qianhouwan-park')
const scrollArts = artsGroup.places.length > 2
const grids = useTemplateRef('attractionGrids')
let artsObserver

onMounted(() => {
  if (!scrollArts) return

  const list = grids.value.find((grid) => grid.hasAttribute('data-scroll-region'))
  const [firstCard, secondCard] = list.children
  const fitTwoCards = () => {
    const gap = Number.parseFloat(getComputedStyle(list).rowGap)
    const height = firstCard.getBoundingClientRect().height + gap + secondCard.getBoundingClientRect().height
    list.style.setProperty('--two-card-height', `${Math.ceil(height)}px`)
  }

  fitTwoCards()
  artsObserver = new ResizeObserver(fitTwoCards)
  artsObserver.observe(firstCard)
  artsObserver.observe(secondCard)
})

onBeforeUnmount(() => artsObserver?.disconnect())
</script>

<template>
  <section class="site-shell attractions-intro">
    <div class="attractions-hero">
      <div class="attractions-copy">
        <p class="mb-2 flex items-center gap-1.5 font-bold text-gold">
          <AppIcon name="pin" /> 南昌 · 三江镇
        </p>
        <h1 class="brush attractions-title">三江周边景点</h1>
        <p class="mt-3 max-w-[28em] text-base leading-relaxed text-ink-soft sm:text-lg">
          从乌龙街出发，逛逛早酒街和老供销社，再到艺术馆看展、到后万古村看石坊与老宅。
        </p>
        <nav aria-label="景点分类" class="mt-5 flex flex-wrap gap-2">
          <RouterLink v-for="group in attractionGroups" :key="group.id" :to="'#' + group.id" class="attractions-jump">
            {{ group.title }} <AppIcon name="arrow" />
          </RouterLink>
          <RouterLink to="#walking-routes" class="attractions-jump">
            推荐打卡路线 <AppIcon name="arrow" />
          </RouterLink>
        </nav>
      </div>
      <RouterLink :to="'#' + park.id" class="attractions-feature-link">
        <figure class="attractions-feature">
          <img :src="media(park.photos[0].file)" :alt="park.photos[0].alt" fetchpriority="high" class="size-full object-cover" />
          <figcaption>
            {{ park.title }} <AppIcon name="arrow" />
          </figcaption>
        </figure>
      </RouterLink>
    </div>
  </section>

  <section v-for="group in attractionGroups" :id="group.id" :key="group.id" :aria-labelledby="group.id + '-title'"
    class="attractions-section">
    <div class="site-shell">
      <div v-reveal class="attractions-section-heading">
        <h2 :id="group.id + '-title'" class="brush flex items-center gap-2 leading-tight text-ink">
          <AppIcon :name="group.icon" class="text-gold" /> {{ group.title }}
        </h2>
        <p class="text-ink-soft">{{ group.description }}</p>
      </div>
      <div ref="attractionGrids" v-reveal.stagger v-scroll-page-at-edge="group === artsGroup && scrollArts"
        class="attractions-grid" :class="{ 'arts-grid': group === artsGroup }"
        :data-scroll-region="group === artsGroup && scrollArts ? '' : undefined"
        :tabindex="group === artsGroup && scrollArts ? 0 : undefined"
        :role="group === artsGroup && scrollArts ? 'region' : undefined"
        :aria-label="group === artsGroup && scrollArts ? '艺术与人文景点' : undefined">
        <AttractionCard v-for="place in group.places" :key="place.id" :place="place"
          :class="{ 'attractions-card--wide-photo': group === artsGroup }" />
      </div>
      <p v-if="group === artsGroup && scrollArts" class="arts-scroll-hint mt-2 text-sm text-ink-soft">
        向下滑动查看更多景点
      </p>
    </div>
  </section>

  <section id="walking-routes" aria-labelledby="walking-routes-title" class="attractions-section">
    <div class="site-shell walking-routes-shell">
      <div v-reveal class="attractions-section-heading">
        <h2 id="walking-routes-title" class="brush flex items-center gap-2 leading-tight text-ink">
          <AppIcon name="route" class="text-gold" /> 推荐打卡路线
        </h2>
        <p class="text-ink-soft">跟着路线走，体验乌龙街的文化与烟火</p>
      </div>
      <WalkingRoutes />
    </div>
  </section>
</template>

<style scoped>
.attractions-intro { padding-block: clamp(1rem, 3.2vw, 3.25rem); }

.attractions-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border: 1px solid var(--color-line);
  border-radius: 1rem;
  background: linear-gradient(145deg, #fff9ed, #f4e7d4);
  overflow: hidden;
}

.attractions-copy {
  align-self: center;
  padding: clamp(1.15rem, 4vw, 4.25rem);
}

.attractions-title {
  color: var(--color-ink);
  font-size: clamp(2.25rem, 4.2vw, 4.75rem);
  line-height: 1.06;
}

.attractions-jump {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  min-height: 2.5rem;
  padding: .35rem .7rem;
  border: 1px solid #bfa387;
  border-radius: .45rem;
  background: #fffaf1;
  color: var(--color-rust);
  font-size: .9rem;
  font-weight: 700;
}

.attractions-jump:hover { background: var(--color-sand); }
.attractions-jump svg { transform: rotate(90deg); }

.attractions-feature {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 14rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.attractions-feature img { position: absolute; inset: 0; object-position: center 51%; }
.attractions-feature figcaption {
  position: absolute;
  inset: auto 0 0;
  padding: 1.75rem 1rem .85rem;
  background: linear-gradient(transparent, #271b10d9);
  text-align: right;
}

.attractions-feature-link:focus-visible { outline-offset: -3px; outline-color: #fff9ec; }
.attractions-feature-link figcaption {
  color: #fff9ec;
  font-size: .95rem;
  font-weight: 700;
}

.attractions-feature-link:hover figcaption { text-decoration: underline; text-underline-offset: .2em; }

.attractions-section { padding-block: clamp(1.45rem, 3vw, 3rem); border-top: 1px solid #d8c6ad99; }
.attractions-section:last-child { padding-bottom: clamp(2rem, 5vw, 4rem); }
.attractions-section-heading { margin-bottom: clamp(.9rem, 1.75vw, 1.5rem); }
.attractions-section-heading h2 { font-size: clamp(1.9rem, 3vw, 2.65rem); }
.attractions-section-heading p { margin-top: .35rem; }
@media (width < 60rem) {
  .walking-routes-shell { max-width: 34rem; }
}

.attractions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(.65rem, 1.5vw, 1.35rem);
}
.arts-scroll-hint { display: none; }

@media (width < 48rem) {
  .arts-grid {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 1rem;
  }
  .arts-grid[data-scroll-region] {
    max-height: var(--two-card-height, none);
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: #a9825c var(--color-sand);
    padding-inline-end: .3rem;
  }
  .arts-scroll-hint { display: block; }
}

@media (min-width: 50rem) {
  .attractions-hero { grid-template-columns: minmax(0, 1fr) minmax(0, 1.28fr); }
  .attractions-feature { min-height: clamp(19.5rem, 29vw, 29rem); aspect-ratio: auto; }
}

@media (min-width: 65rem) {
  .attractions-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
</style>
