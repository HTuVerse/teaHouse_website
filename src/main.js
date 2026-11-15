import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@fontsource/ma-shan-zheng/400.css'
import './style.css'
import './motion.css'
import { reveal } from './motion'

const root = document.documentElement

document.addEventListener('pointerdown', (event) => {
  root.classList.toggle('using-touch', event.pointerType === 'touch')
}, { capture: true, passive: true })

document.addEventListener('keydown', () => {
  root.classList.remove('using-touch')
}, { capture: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('reveal', reveal)

app.mount('#app')
