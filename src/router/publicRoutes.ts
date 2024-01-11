import { RouteNames } from '@/types/Routes'
import TipsterDetailsView from '@/views/TipsterDetailsView.vue'
export default [
  {
    path: '/',
    name: 'Public',
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: '/home',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'home',
        name: RouteNames.HOME,
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'tips/:id',
        name: RouteNames.TIP_DETAILS,
        component: () => import('@/views/TipDetailsView.vue')
      },
      {
        path: 'create-tip',
        name: RouteNames.CREATE_TIP,
        component: () => import('@/views/CreateTipView.vue')
      },
      {
        path: 'tipsters',
        name: RouteNames.TIPSTERS,
        component: () => import('@/views/TipstersView.vue')
      },
      {
        path: 'tipsters/:id',
        name: RouteNames.TIPSTER_DETAILS,
        component: TipsterDetailsView
      }
    ]
  }
]
