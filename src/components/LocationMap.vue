<script setup>
import { onMounted, ref, shallowRef, useId } from 'vue'
import { mapLink, media, mobileMapOptions } from '@/site'
import { address } from '@content/site'
import AppIcon from './AppIcon.vue'

defineProps({ compact: Boolean })

const mapOptions = shallowRef([])
const picker = ref(null)
const pickerTitle = useId()

onMounted(() => { mapOptions.value = mobileMapOptions(navigator) })

function closePicker(event) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  picker.value.close()
}
</script>

<template>
  <figure class="card relative isolate overflow-hidden bg-[#e9eef0]">
    <a :href="media('location.png')" target="_blank" rel="noopener" aria-label="查看乌龙街老茶馆位置图原图" class="block">
      <img :src="media('location.png')" alt="乌龙街老茶馆位置图，茶馆在三江镇河街旁、三江艺术馆以北"
        class="w-full" :class="compact ? 'h-42 object-cover object-[60%_55%] sm:h-42' : 'h-full max-h-[385px] min-h-52 object-cover object-[64%_51%]'"
        width="1583" height="1020" loading="lazy" />
    </a>
    <button v-if="mapOptions.length" type="button" aria-haspopup="dialog" class="btn btn-gold absolute right-3 bottom-3 shadow-sm"
      @click="picker.showModal()">
      <AppIcon name="route" /> 导航到店
    </button>
    <a v-else :href="mapLink" target="_blank" rel="noopener" class="btn btn-gold absolute right-3 bottom-3 shadow-sm">
      <AppIcon name="route" /> 导航到店
    </a>
  </figure>

  <dialog v-if="mapOptions.length" ref="picker" :aria-labelledby="pickerTitle" @click.self="picker.close()"
    class="map-picker fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto overscroll-contain
      rounded-t-2xl border-t border-line bg-paper text-ink shadow-xl backdrop:bg-ink/55">
    <div class="mx-auto max-w-lg pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))]
      pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
      <div aria-hidden="true" class="mx-auto mb-2 h-1 w-9 rounded-full bg-line"></div>
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 :id="pickerTitle" class="text-xl font-bold">选择导航软件</h2>
          <p class="mt-1 text-sm text-ink-soft">目的地：{{ address }}</p>
        </div>
        <button type="button" autofocus aria-label="关闭" @click="picker.close()"
          class="icon-control grid size-11 shrink-0 place-items-center rounded-full border border-line text-rust hover:bg-sand">
          <AppIcon name="close" />
        </button>
      </div>
      <ul class="mt-3 grid gap-2">
        <li v-for="option in mapOptions" :key="option.label">
          <a :href="option.href" class="card flex min-h-12 items-center gap-3 px-3 py-2 hover:border-gold"
            @click="closePicker">
            <AppIcon :name="option.icon" class="text-lg text-rust" />
            <span class="flex-1">
              <span class="block font-bold">{{ option.label }}</span>
              <span v-if="option.description" class="block text-sm text-ink-soft">{{ option.description }}</span>
            </span>
            <AppIcon name="arrow" class="text-sm text-gold" />
          </a>
        </li>
      </ul>
    </div>
  </dialog>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .map-picker[open] { animation: map-picker-enter 220ms ease-out; }
}

@keyframes map-picker-enter {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
