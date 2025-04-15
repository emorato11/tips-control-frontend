import type { Yield, YieldResume } from '@/types/Yield'
import { apiInstance } from '../api/axios'

export default {
  async getById(tipsterId: string) {
    try {
      const response = await apiInstance.get<Yield>(`/yield/${tipsterId}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async getResume() {
    try {
      const response = await apiInstance.get<YieldResume[]>(`/yield`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
