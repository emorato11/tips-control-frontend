import { ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'

export const useCounterStore = defineStore('counter', () => {
  const tips = ref([])

  const getAllTips = async () => {
    const tipsResponse = await tipsService.getAll()
    tips.value = tipsResponse
  }

  return { getAllTips, tips }
})
