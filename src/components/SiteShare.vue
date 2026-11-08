<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { shareDescriptions, sharePagePath, siteName } from '@content/site'
import { chooseShareDescription, shareBase } from '@/share'
import AppIcon from './AppIcon.vue'
import DetailDialog from './DetailDialog.vue'

const route = useRoute()
const router = useRouter()
const dialog = ref(null)
const status = ref('')
const sharing = ref(false)
let lastIndex

function showShareHelp() {
  if (/MicroMessenger/i.test(navigator.userAgent)) {
    status.value = '请点微信右上角「···」，再选「转发给朋友」。'
  } else if (!window.isSecureContext) {
    status.value = '请在手机浏览器打开茶馆的 HTTPS 地址，再点分享。'
  } else {
    status.value = '当前浏览器无法打开系统分享，请在 Safari 或 Chrome 中打开页面后重试。'
  }
  dialog.value.open()
}

async function share() {
  if (sharing.value) return
  if (!window.isSecureContext || typeof navigator.share !== 'function') return showShareHelp()

  const index = chooseShareDescription(lastIndex)
  lastIndex = index
  const url = new URL(sharePagePath(index), shareBase)
  url.searchParams.set('page', router.resolve(route.fullPath).href)
  sharing.value = true
  try {
    await navigator.share({ title: siteName, text: shareDescriptions[index], url: url.href })
  } catch (error) {
    if (error.name !== 'AbortError') showShareHelp()
  } finally {
    sharing.value = false
  }
}
</script>

<template>
  <button type="button" class="icon-control grid size-11 shrink-0 place-items-center rounded-md border border-line text-lg text-rust"
    aria-label="分享" title="分享" :disabled="sharing" @click="share">
    <AppIcon name="share" />
  </button>

  <DetailDialog ref="dialog" title="分享茶馆" aria-label="分享茶馆" class="w-[min(92vw,29rem)]">
    <p class="text-ink-soft">{{ status }}</p>
  </DetailDialog>
</template>
