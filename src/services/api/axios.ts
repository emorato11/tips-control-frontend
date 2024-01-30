import { useAuthStore } from '@/stores'
import axios from 'axios'

const apiInstance = axios.create({
  // baseURL: 'https://tips-control-backend.onrender.com/',
  baseURL: 'https://tips-control-backend-vercel.vercel.app/',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

apiInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.user) config.headers['user_id'] = authStore.user.email
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { apiInstance }
