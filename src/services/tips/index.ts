import type { CreateTip, Tip } from '@/types/Tip'
import { apiInstance } from '../api/axios'

export default {
  async getAll() {
    try {
      const response = await apiInstance.get<Tip[]>('/tips')

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async create(tip: CreateTip) {
    try {
      const response = await apiInstance.post<Tip>('/tips', tip)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async update(id: string, payload: CreateTip) {
    try {
      const response = await apiInstance.patch<CreateTip>('/tips/' + id, payload)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async delete(id: string) {
    try {
      const response = await apiInstance.delete<{ message: string }>('/tips/' + id)

      return !!response.data.message
    } catch (error) {
      console.log(error)
    }
  }
}
