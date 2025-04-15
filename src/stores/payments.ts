import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CreatePayment, Payment } from '@/types/Payment'
import paymentsService from '@/services/payments'

export const usePaymentsStore = defineStore('payments', () => {
  const payments = ref<Payment[]>([])
  const loading = ref(false)

  const recentPayments = computed<Payment[]>(() => {
    return payments.value.slice(0, 5)
  })

  const getAllPaymentsByTipster = async (tipsterId: string) => {
    loading.value = true
    const paymentsResponse = await paymentsService.getAllById(tipsterId)
    payments.value = paymentsResponse || []

    loading.value = false
  }

  const createPayment = async (newPayment: CreatePayment) => {
    loading.value = true
    const paymentCreated = await paymentsService.create(newPayment)

    if (paymentCreated) {
      payments.value = [...payments.value, paymentCreated]
    }

    loading.value = false
  }

  return {
    getAllPaymentsByTipster,
    createPayment,
    payments,
    recentPayments,
    loading
  }
})
