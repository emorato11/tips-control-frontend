import type { CreateTipster, Tipster } from '@/types/Tipster'
import { apiInstance } from '../api/axios'

export default {
  async getAll() {
    try {
      const response = await apiInstance.get<Tipster[]>('/tipsters')

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async create(tipster: CreateTipster) {
    try {
      const response = await apiInstance.post<Tipster>('/tipsters', tipster)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async update(id: string, payload: CreateTipster) {
    try {
      const response = await apiInstance.patch<CreateTipster>('/tipsters/' + id, payload)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async delete(id: string) {
    try {
      const response = await apiInstance.delete<{ message: string }>('/tipsters/' + id)

      return !!response.data.message
    } catch (error) {
      console.log(error)
    }
  }
}
