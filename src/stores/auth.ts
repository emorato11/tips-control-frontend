import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { decodeCredential } from 'vue3-google-login'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()
  const loading = ref(false)
  const token = ref(
    document.cookie
      .split('; ')
      .find((str) => str.startsWith('user_token'))
      ?.split('=')[1]
  )

  const isLogged = computed(() => {
    return !!user.value?.token || !!token.value
  })

  const getUserDetails = async () => {
    loading.value = true
    if (token.value) {
      const userData = decodeCredential(token.value)

      const { given_name, family_name, email, picture, exp } = userData as Record<
        string,
        string & number
      >

      user.value = {
        name: given_name,
        lastName: family_name,
        token: token.value,
        email,
        picture,
        expirationTime: exp
      }

      document.cookie = `user_token=${token.value};exp=${new Date(exp * 1000)}`

      loading.value = false
    }
  }

  const setUserToken = (tokenValue: string) => {
    token.value = tokenValue
  }

  const logout = () => {
    document.cookie = 'user_token='
    token.value = undefined
    user.value = undefined
  }

  return {
    user,
    isLogged,
    loading,
    token,
    getUserDetails,
    setUserToken,
    logout
  }
})
