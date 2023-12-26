export default [
  {
    path: '/',
    name: 'Public',
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: '/create-tip',
        name: 'create-tip',
        component: () => import('@/views/CreateTip.vue')
      },
      {
        path: '/tipsters',
        name: 'tipsters',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/TipstersView.vue')
      }
    ]
  }
]
