<script setup>
defineProps({ name: { type: String, required: true } })

const shapes = {
  home: 'm2 11 10-8 10 8M5 10v11h14V10m-9 11v-7h4v7',
  tea: 'M3 11h15v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6zm15 1h2a2 2 0 0 1 0 4h-2M2 22h19M8 8c-2-2 2-3 0-6m4 6c-2-2 2-3 0-6',
  pavilion: 'M2 10c6 0 8-5 10-7 2 2 4 7 10 7H2zm2 8c4-1 6-4 8-6 2 2 4 5 8 6H4zM6 10v5m12-5v5M6 18v4m12-4v4M3 22h18m-11 0v-3h4v3',
  waves: 'M2 6c4 0 4-2 8-2s4 2 8 2c2 0 3-1 4-2M2 12c4 0 4-2 8-2s4 2 8 2c2 0 3-1 4-2M2 18c4 0 4-2 8-2s4 2 8 2c2 0 3-1 4-2',
  market: 'M3 9l2-5h14l2 5v2a2 2 0 0 1-4 0 2.5 2.5 0 0 1-5 0 2.5 2.5 0 0 1-5 0 2 2 0 0 1-4 0V9zm0 0h18M5 13v8h14v-8m-10 8v-5h6v5',
  calendar: 'M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2zm-2 5h18M7 3v4m10-4v4m-9 7h1m3 0h1m3 0h1m-9 3h1m3 0h1',
  pin: 'M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 1 1 14 0zm-4.5 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z',
  route: 'm3 11 18-8-8 18-2-8zm8 2L21 3',
  arrow: 'm9 5 7 7-7 7',
  left: 'm15 5-7 7 7 7',
  plus: 'M12 5v14M5 12h14',
  clock: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zm-10-5v5l4 2',
  phone: 'm6 3 4 5-3 3c1 3 3 5 6 6l3-3 5 4c0 2-1 3-3 3C10 21 3 14 3 6c0-2 1-3 3-3z',
  people: 'M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-9 12v-2a6 6 0 0 1 12 0v2M7 5a3 3 0 0 0-2 5m12-5a3 3 0 0 1 2 5M2 19v-2a5 5 0 0 1 3-4m17 6v-2a5 5 0 0 0-3-4',
  leaf: 'M20 4C11 3 5 7 5 14c0 3 2 5 5 5 7 0 11-6 10-15zM3 21l12-12',
  flag: 'M4 22V4c5-4 9 4 16 0v11c-7 4-11-4-16 0',
  car: 'm4 10 2-6h12l2 6M3 10h18v9H3zm2 9v2m14-2v2m-13-7h2m8 0h2',
  walk: 'M14 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 5-3 4-3 1m8-5 3 4 4 1m-8-4-1 6-4 5m4-5 5 2 2 3',
  mic: 'M18 2a4 4 0 0 1 4 4l-3 4-5-5zM15 7l2 2L7 21H3v-4z',
  photo: 'M3 7h4l2-3h6l2 3h4v13H3zm13 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  expand: 'M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5',
  book: 'M12 5c-3-3-7-3-10-2v16c3-1 7-1 10 2 3-3 7-3 10-2V3c-3-1-7-1-10 2zm0 0v16',
  quote: 'M21 5H3v12h5l-1 4 6-4h8zM7 11h1m4 0h1m4 0h1',
  sun: 'M5 17a7 7 0 0 1 14 0M2 18h20M12 3v3M4 7l2 2m14-2-2 2',
  menu: 'M3 6h18M3 12h18M3 18h18',
  share: 'm8 11 8-5m-8 7 8 5M8 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm14-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm0 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  close: 'm5 5 14 14M19 5 5 19',
  check: 'm4 12 5 5L20 6',
  edit: 'm15 5 4 4M4 20l1-5L16 4a2 2 0 0 1 3 0l1 1a2 2 0 0 1 0 3L9 19z',
}
</script>

<template>
  <svg class="inline-block size-[1.2em] shrink-0" :class="{ 'action-arrow': name === 'arrow' }" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="shapes[name]" />
  </svg>
</template>
