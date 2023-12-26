export default [
  {
    path: '/account',
    name: 'account',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: '/', redirect: 'login' },
      { path: 'login', component: () => import('@/views/LoginView.vue') }
    ]
  }
]
