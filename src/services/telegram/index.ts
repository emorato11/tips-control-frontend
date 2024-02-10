import { apiInstance } from '../api/axios'

export default {
  async initTelegramBot() {
    try {
      const response = await apiInstance.get<{ message: string }>('/telegram/init')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
