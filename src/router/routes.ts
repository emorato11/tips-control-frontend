import HomeView from '@/views/HomeView.vue'
import TipstersView from '@/views/TipstersView.vue'
export default [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tipsters',
    name: 'tipsters',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: TipstersView
  }
]
