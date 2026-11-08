<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { events } from '@content/activities'
import { eventDateLabel, occursOn } from '../dates'

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: 'numeric', day: 'numeric',
})
const today = ref(getToday())
const month = ref(new Date(today.value.getFullYear(), today.value.getMonth(), 1))
const selectedDay = ref(null)
const monthDirection = ref(0)
let clock

function getToday() {
  const parts = Object.fromEntries(dateFormatter.formatToParts().map(({ type, value }) => [type, value]))
  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day))
}

function isSameMonth(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function refreshToday() {
  const next = getToday()
  if (+next === +today.value) return

  if (isSameMonth(month.value, today.value) && !isSameMonth(next, today.value)) {
    month.value = new Date(next.getFullYear(), next.getMonth(), 1)
    selectedDay.value = null
  }
  today.value = next
}

onMounted(() => {
  clock = window.setInterval(refreshToday, 15_000)
  document.addEventListener('visibilitychange', refreshToday)
})
onUnmounted(() => {
  window.clearInterval(clock)
  document.removeEventListener('visibilitychange', refreshToday)
})

const monthLabel = computed(() => month.value.getFullYear() + '年 ' + (month.value.getMonth() + 1) + '月')
const days = computed(() => {
  const year = month.value.getFullYear()
  const index = month.value.getMonth()
  const offset = (month.value.getDay() + 6) % 7
  const count = new Date(year, index + 1, 0).getDate()
  return Array.from({ length: Math.ceil((offset + count) / 7) * 7 }, (_, cell) => {
    const date = new Date(year, index, cell - offset + 1)
    const day = date.getDate()
    const inMonth = date.getMonth() === index
    return {
      day, inMonth,
      isToday: +date === +today.value,
      events: inMonth ? events.filter((event) => occursOn(event, date)) : [],
    }
  })
})
const visibleEvents = computed(() => {
  if (selectedDay.value === null) {
    return events.filter((event) => days.value.some((cell) => cell.events.includes(event)))
  }
  return days.value.find((cell) => cell.inMonth && cell.day === selectedDay.value)?.events ?? []
})

function shiftMonth(amount) {
  monthDirection.value = amount
  month.value = new Date(month.value.getFullYear(), month.value.getMonth() + amount, 1)
  selectedDay.value = null
}
</script>

<template>
  <section id="calendar" class="page-section band">
    <div v-reveal.stagger class="site-shell grid gap-4 lg:grid-cols-[.8fr_1fr] lg:gap-8">
      <div>
        <div class="mb-2 flex flex-wrap items-center justify-between gap-1">
          <h2 class="font-display flex items-center gap-2 text-[clamp(1.28rem,2.1vw,1.8rem)] font-bold"><AppIcon name="calendar" class="text-gold" />本月活动日历</h2>
          <div class="flex items-center gap-1">
            <button class="icon-control grid size-8 place-items-center rounded-full hover:bg-sand" type="button" aria-label="上个月" @click="shiftMonth(-1)"><AppIcon name="left" /></button>
            <p class="min-w-24 text-center font-bold" aria-live="polite">{{ monthLabel }}</p>
            <button class="icon-control grid size-8 place-items-center rounded-full hover:bg-sand" type="button" aria-label="下个月" @click="shiftMonth(1)"><AppIcon name="arrow" /></button>
          </div>
        </div>
        <div class="card px-3 py-2">
          <div class="grid grid-cols-7 border-b border-line/70 py-1 text-center font-bold">
            <span v-for="(name, index) in '一二三四五六日'" :key="name" :class="{ 'text-rust': index > 4 }">{{ name }}</span>
          </div>
          <div :key="monthLabel" class="month-change grid grid-cols-7 py-1.5 text-center tabular-nums"
            :style="{ '--month-offset': monthDirection * 8 + 'px' }">
            <div v-for="(cell, index) in days" :key="index" class="grid place-items-center">
              <button v-if="cell.inMonth" type="button" class="calendar-day my-0.5 min-h-7 w-9 rounded-full hover:bg-sand"
                :class="{ 'bg-rust text-white hover:bg-rust': selectedDay === cell.day, 'bg-[#ecc9ae] text-rust font-bold': cell.events.length && selectedDay !== cell.day, 'ring-1 ring-rust font-bold': cell.isToday }"
                :aria-label="cell.day + '日' + (cell.isToday ? '，今天' : '') + (cell.events.length ? '，有活动' : '')"
                :aria-current="cell.isToday ? 'date' : undefined"
                :aria-pressed="selectedDay === cell.day" @click="selectedDay = selectedDay === cell.day ? null : cell.day">{{ cell.day }}</button>
              <span v-else class="my-0.5 grid min-h-7 place-items-center text-ink-soft/65">{{ cell.day }}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-2 flex min-h-8 flex-wrap items-center justify-between gap-2">
          <h2 class="font-display text-xl font-bold">{{ selectedDay ? selectedDay + '日活动' : '本月主要活动' }}</h2>
          <button v-if="selectedDay" type="button" class="text-link text-sm" @click="selectedDay = null">查看整月</button>
        </div>
        <ul v-if="visibleEvents.length" :key="monthLabel + ':' + selectedDay" class="calendar-result card divide-y divide-line/70 px-3">
          <li v-for="event in visibleEvents" :key="event.id">
            <RouterLink :to="{ name: 'activity-detail', params: { eventId: event.id } }" class="grid grid-cols-[auto_auto_1fr] items-center gap-2 py-1.5 hover:text-rust sm:gap-4">
              <span class="whitespace-nowrap text-sm font-bold text-rust">{{ eventDateLabel(event) }}</span>
              <AppIcon :name="event.icon" class="text-xl text-gold" />
              <span class="font-bold">{{ event.title }} <span class="text-sm font-normal">· {{ event.theme }}</span></span>
            </RouterLink>
          </li>
        </ul>
        <p v-else :key="monthLabel + ':' + selectedDay" class="calendar-result card p-4" role="status">该{{ selectedDay ? '日' : '月' }}暂无活动记录。</p>
      </div>
    </div>
  </section>
</template>
