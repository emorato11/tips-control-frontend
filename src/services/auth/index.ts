import type { User } from '@/types/User'
import { apiInstance } from '../api/axios'

export default {
  async login(user: User) {
    try {
      const response = await apiInstance.post<{ token: string; user: User }>('/auth', user)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async recoverUserData() {
    try {
      const response = await apiInstance.get<{ token: string; user: User }>('/auth/recover')

      console.log(response.data)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
