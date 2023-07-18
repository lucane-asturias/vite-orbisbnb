import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ListingsRootPage from '@/modules/listings/views/ListingsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ListingsRootPage',
    component: ListingsRootPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // scroll to top when navigating to a new route
    return { top: 0 }
  }
})

export default router
