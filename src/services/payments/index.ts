import type { CreatePayment, Payment } from '@/types/Payment'
import { apiInstance } from '../api/axios'

export default {
  async getAllById(tipsterId: string) {
    try {
      const response = await apiInstance.get<Payment[]>(`/payments/${tipsterId}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  },

  async create(payment: CreatePayment) {
    try {
      const response = await apiInstance.post<Payment>('/payments', payment)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
