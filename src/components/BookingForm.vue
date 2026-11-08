<script setup>
import { computed, ref } from 'vue'
import AppIcon from './AppIcon.vue'
import { phone, phoneLink } from '@content/site'

const draft = ref(null)
const today = computed(() => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format())

function prepare(event) {
  const fields = new FormData(event.currentTarget)
  const phoneField = event.currentTarget.elements.namedItem('phone')
  if (fields.get('phone').replace(/\D/g, '').length < 7) {
    phoneField.setCustomValidity('请输入至少 7 位数字的联系电话。')
    phoneField.reportValidity()
    return
  }
  draft.value = {
    name: fields.get('name').trim(),
    guests: fields.get('guests'),
    time: fields.get('date') + ' ' + fields.get('time'),
  }
}
</script>

<template>
  <section id="booking" class="page-section band scroll-mt-4">
    <div v-reveal class="site-shell card ink-landscape p-4 sm:p-6">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h2 class="brush flex items-center gap-2 text-[clamp(1.9rem,3vw,3rem)] text-rust">
          <AppIcon name="edit" class="text-gold" /> 到店预约
          <span class="font-display text-base font-bold text-ink-soft sm:text-xl">· 预留席位</span>
        </h2>
        <a :href="phoneLink" class="text-link"><AppIcon name="phone" /> 电话预约 {{ phone }}</a>
      </div>
      <p class="mt-1 text-sm text-ink-soft">填好到店时间和人数后，请拨打预约电话确认席位。</p>
      <form class="mt-4 grid grid-cols-2 items-end gap-3 sm:grid-cols-4 lg:grid-cols-6" @input="draft = null" @submit.prevent="prepare">
        <label class="grid min-w-0 gap-1 text-sm font-bold">姓名 <input name="name" class="form-field font-normal" autocomplete="name" maxlength="40" pattern=".*\S.*" required placeholder="请输入姓名" /></label>
        <label class="grid min-w-0 gap-1 text-sm font-bold">电话 <input name="phone" class="form-field font-normal" type="tel" autocomplete="tel" pattern="[+0-9\s\-]{7,20}" required placeholder="请输入联系电话" @input="$event.target.setCustomValidity('')" /></label>
        <label class="grid min-w-0 gap-1 text-sm font-bold">到店日期 <input name="date" class="form-field font-normal" type="date" :min="today" required /></label>
        <label class="grid min-w-0 gap-1 text-sm font-bold">到店时间
          <select name="time" class="form-field font-normal" required>
            <option value="" disabled selected>请选择</option>
            <option v-for="hour in 15" :key="hour" :value="String(hour + 6).padStart(2, '0') + ':00'">{{ String(hour + 6).padStart(2, '0') }}:00</option>
          </select>
        </label>
        <label class="grid min-w-0 gap-1 text-sm font-bold">人数
          <select name="guests" class="form-field font-normal" required>
            <option value="" disabled selected>请选择人数</option>
            <option v-for="n in 12" :key="n" :value="n">{{ n }} 位</option>
            <option value="13+">13 位及以上</option>
          </select>
        </label>
        <button type="submit" class="btn btn-primary min-h-10"><AppIcon name="route" /> 核对到店信息</button>
      </form>
      <Transition name="booking-result">
        <div v-if="draft" class="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md bg-sand px-3 py-2" role="status">
          <p>{{ draft.name }} · {{ draft.time }} · {{ draft.guests }} 位。请致电门店确认。</p>
          <a :href="phoneLink" class="btn btn-primary"><AppIcon name="phone" /> 拨打预约电话</a>
        </div>
      </Transition>
    </div>
  </section>
</template>
