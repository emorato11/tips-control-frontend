import type { CreateGroup, Group } from '@/types/Group'
import { apiInstance } from '../api/axios'

export default {
  async getAll() {
    try {
      const response = await apiInstance.get<Group[]>('/groups')

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async getAllByTipsterId({tipsterId}: { tipsterId: string }) {
    try {
      const response = await apiInstance.get<Group[]>('/groups/' + tipsterId)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async create(group: CreateGroup) {
    try {
      const response = await apiInstance.post<Group>('/groups', group)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async update(id: string, payload: CreateGroup) {
    try {
      const response = await apiInstance.patch<CreateGroup>('/groups/' + id, payload)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
