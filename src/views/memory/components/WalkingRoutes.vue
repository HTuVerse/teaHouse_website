<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { media } from '@/site'
import { attractionGroups, walkingRoutes } from '@content/memory'

const placeTitles = new Map(attractionGroups.flatMap(({ places }) => places.map(({ id, title }) => [id, title])))
const illustration = (name) => media(`walking-routes/${name}.webp`)
</script>

<template>
  <div v-reveal.stagger class="route-grid">
    <article v-for="route in walkingRoutes" :key="route.id" class="route-card" :class="'route-card--' + route.id">
      <img class="route-motif" :src="illustration(route.motif)" alt="" loading="lazy" decoding="async" />
      <header class="route-header">
        <h3 class="brush route-title">
          {{ route.title }}
          <svg class="route-brushstroke" viewBox="0 0 240 27" fill="currentColor" aria-hidden="true">
            <path d="M2 22C47 7 94-1 145 5c29 3 50 11 93-2-25 12-49 15-76 12-16-2-27-4-42-2 7-3 16-4 23-4C101 5 51 21 10 25c-5 1-9 0-8-3Z" />
          </svg>
        </h3>
        <span class="route-label">{{ route.label }}</span>
        <p class="route-description">{{ route.description }}</p>
      </header>
      <div class="route-body">
        <ol class="route-stops" role="list">
          <li v-for="(stop, index) in route.stops" :key="stop.placeId ?? stop.to" class="route-stop">
            <span class="route-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <RouterLink :to="stop.to ?? '#' + stop.placeId" class="route-link" :aria-describedby="route.id + '-tip-' + index">
              <span class="route-stop-title">
                {{ stop.title ?? placeTitles.get(stop.placeId) }} <AppIcon name="arrow" />
              </span>
            </RouterLink>
            <p :id="route.id + '-tip-' + index" class="route-stop-tip">{{ stop.tip }}</p>
          </li>
        </ol>
        <img class="route-scene" :src="illustration(route.scene)" alt="" loading="lazy" decoding="async" />
      </div>
    </article>
  </div>
  <p class="mt-4 flex items-start gap-1.5 text-sm text-ink-soft">
    <AppIcon name="clock" class="mt-0.5 text-gold" />
    <span>点站名可查看景点介绍或茶馆位置；展馆和店铺的开放时间建议出发前确认。</span>
  </p>
</template>

<style scoped>
.route-grid {
  display: grid;
  gap: clamp(.85rem, 1.5vw, 1.25rem);
}

.route-card {
  --route-accent: #852d16;
  --route-tint: #f3dacc;
  --route-brush: #ce8552;
  --route-number-size: 2.3rem;
  --route-padding: clamp(.8rem, 1.5vw, 1.35rem);
  position: relative;
  isolation: isolate;
  container-type: inline-size;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: .7rem;
  min-inline-size: 0;
  overflow: hidden;
  padding: .85rem var(--route-padding) 0;
  border-radius: clamp(.9rem, 2vw, 1.45rem);
  background: url('/media/paper-grain.svg'),
    radial-gradient(ellipse at 45% 33%, #fffcf5 5%, transparent 65%),
    radial-gradient(ellipse at 88% 95%, #ecddc567, transparent 64%), #f9f0e3;
}

.route-card--arts-and-water {
  --route-accent: #1d5042;
  --route-tint: #dee6d8;
  --route-brush: #739781;
}

.route-card--houwan-walk {
  --route-accent: #744718;
  --route-tint: #f1e1c9;
  --route-brush: #d49963;
}

.route-motif, .route-scene {
  z-index: -1;
  pointer-events: none;
  object-fit: contain;
}

.route-motif {
  position: absolute;
  inset: .45rem auto auto .55rem;
  width: 24%;
  height: clamp(3.15rem, 17.5cqi, 5.4rem);
  object-position: left center;
}

.route-scene {
  position: absolute;
  inset: auto calc(.15rem - var(--route-padding)) .15rem auto;
  width: 66%;
  height: 100%;
  object-position: right bottom;
  mask-image: linear-gradient(to right, transparent, #0004 28%, #000 64%);
}

.route-header {
  display: grid;
  grid-template-columns: 22% minmax(0, 1fr) auto;
  grid-template-rows: minmax(clamp(3rem, 16cqi, 5.15rem), auto) auto;
  align-items: center;
  gap: .5rem .4rem;
}

.route-title {
  grid-column: 2;
  width: fit-content;
  font-size: clamp(1.37rem, 7.6cqi, 2.6rem);
  line-height: 1.1;
  color: #382013;
}

.route-brushstroke {
  display: block;
  width: 83%;
  height: .41em;
  margin: -.03em auto 0;
  color: var(--route-brush);
  opacity: .8;
}

.route-label, .route-number { background: var(--route-tint); color: var(--route-accent); }

.route-label {
  grid-column: 3;
  align-self: start;
  margin-block-start: .15em;
  border-radius: 999px;
  padding: .3em .6em;
  font-size: clamp(.76rem, 3.45cqi, 1.12rem);
  line-height: 1.25;
  font-weight: 700;
  white-space: nowrap;
}

.route-description, .route-stop-tip {
  font-size: clamp(.89rem, 3.6cqi, 1.1rem);
  line-height: 1.42;
  color: #4d3426;
}

.route-description { grid-column: 1 / -1; }

.route-body {
  position: relative;
  isolation: isolate;
  min-height: clamp(10.75rem, 51cqi, 15rem);
  padding-block: .15rem 1.15rem;
}

.route-stops {
  display: grid;
  width: min(100%, max(75%, 13.5rem));
  align-content: start;
  row-gap: .85rem;
}

.route-stop {
  position: relative;
  display: grid;
  grid-template-columns: var(--route-number-size) minmax(0, 1fr);
  align-items: start;
  column-gap: .7rem;
}

.route-stop:not(:last-child)::before {
  position: absolute;
  inset: calc(var(--route-number-size) + .15rem) auto -.65rem calc(var(--route-number-size) / 2);
  border-inline-start: 1px dashed var(--route-brush);
  content: '';
  pointer-events: none;
}

.route-number {
  display: grid;
  grid-row: 1 / span 2;
  block-size: var(--route-number-size);
  place-items: center;
  border-radius: 50%;
  font-size: 1.1rem;
  font-variant-numeric: tabular-nums;
}

.route-link {
  justify-self: start;
  border-radius: .15em;
  color: var(--route-accent);
  font-size: clamp(1.05rem, 4.8cqi, 1.48rem);
  font-weight: 700;
  line-height: 1.25;
}

.route-link::after { position: absolute; inset: 0; content: ''; }
.route-stop-title svg { width: .85em; height: .85em; vertical-align: -.09em; }
.route-link:hover { text-decoration: underline; text-underline-offset: .18em; }
.route-link:focus-visible { outline-color: var(--route-accent); }
.route-stop-tip { grid-column: 2; margin-top: .15em; }
.route-link, .route-stop-tip { text-shadow: 0 0 .24em #fff8eb, 0 0 .42em #fff8eb; }

@media (width >= 60rem) {
  .route-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }

  @supports (grid-template-rows: subgrid) {
    .route-card {
      grid-row: span 2;
      grid-template-rows: subgrid;
    }
  }
}
</style>
