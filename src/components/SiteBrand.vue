<script setup>
import { brandCaption, siteName } from '@content/site'

defineProps({ light: Boolean, compact: Boolean })
</script>

<template>
  <RouterLink to="/" class="brand inline-flex shrink-0 items-center" :class="compact ? 'gap-2' : 'gap-2.5'" :aria-label="siteName + '，首页'">
    <svg class="shrink-0" :class="compact ? 'h-8 w-13' : 'h-11 w-16 sm:h-13 sm:w-20'" viewBox="0 0 86 53" fill="none" stroke="currentColor"
      stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 35C19 29 31 17 39 10c5 8 14 13 27 17-20-4-38 0-64 8zm13-2 2 14m5-16v17m35-20v11m5-10v10M12 48h51M4 51h79M26 46V34l13-4v16m7-12 7-1v9h-7zm-34-8c8-6 12-11 13-18l3 5m10-5 3-5 3 6M55 19l10-5 8 9-8-2m-4 5v11M61 39h17v3a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6zm17 1h3c3 0 2 4-2 4h-1m-13-8c-3-3 4-3 1-6m6 6c-3-3 4-3 1-6" />
    </svg>
    <span>
      <strong class="brush block whitespace-nowrap leading-none" :class="[
        light ? 'text-[#f7ead5]' : 'text-ink',
        compact ? 'text-[clamp(1.2rem,1.65vw,1.55rem)]' : 'text-[clamp(1.2rem,2.28vw,2rem)]',
      ]">{{ siteName }}</strong>
      <small class="mt-1 block whitespace-nowrap text-[0.62rem]" :class="compact ? 'tracking-[.1em]' : 'tracking-[.2em]'">
        <slot name="caption">{{ brandCaption }}</slot>
      </small>
    </span>
    <span v-if="!compact" class="seal hidden sm:inline-block">三江</span>
  </RouterLink>
</template>
