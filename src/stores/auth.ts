import { ref } from 'vue'
import { defineStore } from 'pinia'
import authService from '@/services/auth'
import type { User } from '@/types/User'
import { decodeCredential } from 'vue3-google-login'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User>()
    const loading = ref(false)
    const token = ref(localStorage.getItem('token'))

    const handleLogin = async () => {
      loading.value = true

      if (token.value) {
        const userData = decodeCredential(token.value)

        const { name, email, picture, sub } = userData as Record<string, string & number>

        const userResponse = await authService.login({ name, email, picture, id: sub })

        localStorage.setItem('token', userResponse?.token || '')

        user.value = userResponse?.user

        loading.value = false
      }
    }

    const recoverUserData = async () => {
      const response = await authService.recoverUserData()

      console.log(response)
    }

    const setUserToken = (tokenValue: string) => {
      token.value = tokenValue
    }

    const logout = () => {
      localStorage.removeItem('token')
      token.value = null
      user.value = undefined
    }

    return {
      user,
      loading,
      token,
      handleLogin,
      setUserToken,
      recoverUserData,
      logout
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
