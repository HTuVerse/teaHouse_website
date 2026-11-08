import { createRouter, createWebHistory } from 'vue-router'
import { updateBrowserShareMetadata } from '@/share'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', alias: '/index.html', component: () => import('@/views/home/index.vue') },
    { path: '/menu', name: 'menu', alias: '/menu.html', component: () => import('@/views/menu/index.vue') },
    { path: '/activities', name: 'activities', alias: '/activities.html', component: () => import('@/views/activities/index.vue') },
    { path: '/activities/:eventId', name: 'activity-detail', props: true, component: () => import('@/views/activities/detail.vue') },
    { path: '/wulong-memory', name: 'memory', alias: '/wulong-memory.html', component: () => import('@/views/memory/index.vue') },
    { path: '/guide', name: 'guide', alias: '/guide.html', component: () => import('@/views/guide/index.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      const target = document.getElementById(to.hash.slice(1))
      if (target) {
        const smooth = to.path === from.path && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const headerHeight = document.getElementById('site-header')?.offsetHeight ?? 0
        return { el: target, top: headerHeight + 18, behavior: smooth ? 'smooth' : 'instant' }
      }
    }
    return { top: 0 }
  },
})

router.afterEach((to, from, failure) => {
  if (!failure && (to.path !== from.path || !from.matched.length)) updateBrowserShareMetadata()
})

export default router
