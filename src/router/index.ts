import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './authRoutes'
import publicRoutes from './publicRoutes'
import { RoutesName } from '@/types/Routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...authRoutes, { path: '/:pathMatch(.*)*', redirect: '/' }]
})

router.beforeEach(async (to, _, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.name === RoutesName.LOGIN && token) {
    next('/home')
  } else {
    next()
  }
})

export default router
