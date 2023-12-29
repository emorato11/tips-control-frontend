import TipsterDetailsView from '@/views/TipsterDetailsView.vue'
export default [
  {
    path: '/',
    name: 'Public',
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'create-tip',
        name: 'create-tip',
        component: () => import('@/views/CreateTipView.vue')
      },
      {
        path: 'tipsters',
        name: 'tipsters',
        component: () => import('@/views/TipstersView.vue')
      },
      {
        path: 'tipsters/:id',
        name: 'tipster-detail',
        component: TipsterDetailsView
      }
    ]
  }
]
