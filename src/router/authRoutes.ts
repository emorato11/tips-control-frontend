import { RoutesName, RoutesPath } from '@/types/Routes'

export default [
  {
    path: RoutesPath.LOGIN,
    name: RoutesName.LOGIN,
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  }
]
