import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import authRoutes from './authRoutes'
import publicRoutes from './publicRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...authRoutes, { path: '/:pathMatch(.*)*', redirect: '/' }]
})

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLogged) {
    next('/login')
  } else {
    if (!authStore.user) {
      authStore.getUserDetails()
    }

    if (!to.meta.requiresAuth && authStore.isLogged) {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
