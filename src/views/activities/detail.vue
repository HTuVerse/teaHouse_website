<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import { media } from '@/site'
import { address } from '@content/site'
import { events } from '@content/activities'
import { eventDateLabel } from './dates'

const props = defineProps({ eventId: { type: String, required: true } })
const event = computed(() => events.find(({ id }) => id === props.eventId))
const booking = computed(() => event.value?.booking)
const now = ref(Date.now())
const ended = computed(() => !booking.value || (event.value.endsAt && now.value >= Date.parse(event.value.endsAt)))
const registrationClosed = computed(() => booking.value?.deadline && now.value >= Date.parse(booking.value.deadline))
let clock

onMounted(() => { clock = window.setInterval(() => { now.value = Date.now() }, 15_000) })
onUnmounted(() => window.clearInterval(clock))
</script>

<template>
  <section class="page-section band">
    <div class="site-shell">
      <RouterLink to="/activities#events" class="text-link mb-3 text-sm"><AppIcon name="left" /> 返回活动列表</RouterLink>
      <template v-if="event">
        <div class="card overflow-hidden md:grid md:grid-cols-[1fr_1.25fr]">
          <PhotoPreview :src="media(event.image)" :alt="event.title + '封面'" :title="event.title"
            :image-class="['event-hero-photo', event.imagePosition].filter(Boolean).join(' ')"
            class="aspect-[2.4] md:h-full md:min-h-56" preview-label="预览大图" />
          <div class="event-hero-copy ink-landscape flex flex-col justify-center p-4 sm:p-6">
            <p class="text-sm font-bold text-rust">{{ ended ? '往期回顾' : event.badge }} · {{ event.theme }}</p>
            <h1 class="mt-1 text-[clamp(1.75rem,3.7vw,3.2rem)] leading-tight font-bold">{{ event.title }}</h1>
            <p class="mt-2">{{ event.description }}</p>
          </div>
        </div>

        <div v-reveal.stagger class="mt-4 grid items-start gap-4 md:grid-cols-[1.2fr_1fr]">
          <div class="card p-4 sm:p-5">
            <h2 class="text-xl font-bold">活动信息</h2>
            <dl class="mt-3 space-y-2">
              <div class="flex items-start gap-2"><dt class="shrink-0 font-bold text-rust"><AppIcon name="calendar" /> 时间</dt><dd>{{ event.weekends ? '' : event.startDate.slice(0, 4) + '年' }}{{ eventDateLabel(event) }} {{ event.time }}</dd></div>
              <div class="flex items-start gap-2"><dt class="shrink-0 font-bold text-rust"><AppIcon name="pin" /> 地点</dt><dd>{{ event.place }}<br /><span class="text-sm text-ink-soft">{{ address }}</span></dd></div>
              <div v-for="note in event.notes" :key="note.label" class="flex items-start gap-2"><dt class="shrink-0 font-bold text-rust">{{ note.label }}</dt><dd>{{ note.text }}</dd></div>
            </dl>
            <template v-if="event.highlights">
              <h3 class="mt-4 font-bold">活动内容</h3>
              <ul class="mt-1 list-disc space-y-1 pl-5">
                <li v-for="highlight in event.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </template>
          </div>

          <aside class="card p-4 sm:p-5">
            <template v-if="ended">
              <h2 class="text-xl font-bold">往期回顾</h2>
              <p class="mt-2">{{ event.endsAt ? '已过原定活动时间，报名已结束。' : '本场活动已结束。' }}</p>
              <PhotoPreview v-if="event.poster" :src="media(event.poster)" :alt="event.title + '活动海报'"
                :title="event.title + ' · 活动海报'" class="btn btn-outline mt-3">
                <AppIcon name="photo" /> 查看完整活动海报
              </PhotoPreview>
            </template>
            <template v-else>
              <h2 class="text-xl font-bold">{{ booking.email ? '邮件报名' : '电话预约' }}</h2>
              <p v-if="registrationClosed" class="mt-2 font-bold text-rust">报名已截止</p>
              <p v-else class="mt-2">{{ booking.instructions }}</p>
              <p v-if="booking.deadlineLabel" class="mt-2 text-sm">报名截止时间为 {{ booking.deadlineLabel }}（北京时间）。</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <a v-if="booking.email && !registrationClosed" :href="'mailto:' + booking.email" class="btn btn-primary">发送报名邮件 <span class="text-sm">{{ booking.email }}</span></a>
                <a v-if="booking.phone" :href="booking.phoneLink" class="btn btn-primary"><AppIcon name="phone" /> 拨打 {{ booking.phone }}</a>
                <a v-if="booking.consultationPhone" :href="'tel:' + booking.consultationPhone" class="btn btn-outline"><AppIcon name="phone" /> 咨询主办方 {{ booking.consultationPhone }}</a>
              </div>
            </template>
          </aside>
        </div>
      </template>
      <h1 v-else v-reveal class="text-2xl font-bold">未找到该活动</h1>
    </div>
  </section>
</template>
