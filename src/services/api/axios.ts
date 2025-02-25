import axios from 'axios'

const apiInstance = axios.create({
  // baseURL: 'https://tips-control-backend.onrender.com/',
  baseURL: 'https://tips-control-backend-vercel.vercel.app/',
  // baseURL: 'http://localhost:8080/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Recuperamos el token almacenado

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { apiInstance }
