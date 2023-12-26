import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>({
    name: 'Enrique',
    lastName: 'Morato',
    id: 'asfafr',
    token: 'erwtbcylb24523'
  })

  const isLogged = computed(() => user.value?.token)
  const login = () => {
    console.log('Do Login')
  }

  const logout = () => {
    console.log('Do Logout')
  }

  return {
    user,
    isLogged,
    login,
    logout
  }
})
