import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useTelegramStore } from '@/stores/telegram'
import { RoutesName, RoutesPath } from '@/types/Routes'

export default [
  {
    path: RoutesPath.ROOT,
    name: RoutesName.ROOT,
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: { name: RoutesName.HOME },
    meta: { requiresAuth: true },
    children: [
      {
        path: RoutesPath.HOME,
        name: RoutesName.HOME,
        component: () => import('@/views/HomeView.vue'),
        beforeEnter: async (
          _: RouteLocationNormalized,
          _2: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          const telegramStore = useTelegramStore()

          await telegramStore.initBot()

          next()
        }
      },
      {
        path: RoutesPath.TIP_DETAILS,
        name: RoutesName.TIP_DETAILS,
        component: () => import('@/views/TipDetailsView.vue')
      },
      {
        path: RoutesPath.CREATE_TIP,
        name: RoutesName.CREATE_TIP,
        component: () => import('@/views/CreateTipView.vue')
      },
      {
        path: RoutesPath.TIPSTERS,
        name: RoutesName.TIPSTERS,
        component: () => import('@/views/TipstersView.vue')
      },
      {
        path: RoutesPath.TIPSTER_DETAILS,
        name: RoutesName.TIPSTER_DETAILS,
        component: import('@/views/TipsterDetailsView.vue')
      },
      {
        path: RoutesPath.YIELD,
        name: RoutesName.YIELD,
        component: () => import('@/views/YieldView.vue')
      }
    ]
  }
]
