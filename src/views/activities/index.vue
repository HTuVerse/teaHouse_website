<script setup>
import AppIcon from '@/components/AppIcon.vue'
import PageHero from '@/components/PageHero.vue'
import PhotoPreview from '@/components/PhotoPreview.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import EventCalendar from './components/EventCalendar.vue'
import EventCard from './components/EventCard.vue'
import { events, faqs, gallery, headings, hero } from '@content/activities'
import { media } from '@/site'
</script>

<template>
  <PageHero :title="hero.title" :seal="hero.seal">
    {{ hero.description }}
    <template #actions>
      <RouterLink to="#calendar" class="btn btn-primary btn-round"><AppIcon name="calendar" /> 本月活动日历</RouterLink>
      <RouterLink to="#events" class="btn btn-outline btn-round"><AppIcon name="arrow" /> 查看活动</RouterLink>
    </template>
  </PageHero>
  <EventCalendar />

  <section id="events" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.events.title" :subtitle="headings.events.subtitle" icon="leaf" />
      <div v-reveal.stagger class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <EventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
    </div>
  </section>

  <section class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.gallery.title" :subtitle="headings.gallery.subtitle" icon="photo" />
      <div v-reveal.stagger class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        <PhotoPreview v-for="photo in gallery" :key="photo.image" :src="media(photo.image + '.jpg')" :alt="photo.title"
          class="aspect-[4/3] rounded-md border border-line" />
      </div>
    </div>
  </section>

  <section id="faq" class="page-section band">
    <div class="site-shell">
      <SectionHeading :title="headings.faq.title" icon="quote" />
      <div v-reveal.stagger class="grid gap-1.5">
        <details v-for="item in faqs" :key="item.question" name="teahouse-faq" class="card faq-item">
          <summary class="rounded-[inherit] px-3 py-2 font-bold hover:text-rust">{{ item.question }}</summary>
          <p class="mx-3 border-t border-line/60 py-2 text-sm">
            {{ item.answer }}<a v-if="item.contact" :href="item.contact.href" class="font-bold text-rust underline">{{ item.contact.label }}</a>
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
