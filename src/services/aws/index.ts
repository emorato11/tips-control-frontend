import { apiInstance } from '../api/axios'

export default {
  async getStoredFiles() {
    try {
      const response = await apiInstance.get<any>('/aws/get-all')

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async startSync() {
    try {
      const response = await apiInstance.get<{ message: string }>('/aws/start-sync')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
