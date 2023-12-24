import { ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'
import type { Tip } from '@/types/Tip'

export const useCounterStore = defineStore('counter', () => {
  const tips = ref<Tip[]>()

  const getAllTips = async () => {
    const tipsResponse = await tipsService.getAll()
    tips.value = tipsResponse
  }

  return { getAllTips, tips }
})
