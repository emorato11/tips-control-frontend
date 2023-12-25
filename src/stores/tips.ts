import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'
import type { Tip } from '@/types/Tip'
import { getSportAssets } from '@/utils/tips'
import { CUSTOM_SHORT_DATE_FORMAT, getParsedDate } from '@/utils/date'
import { parseNumberToCurrency } from '@/utils/currency'

export const useTipsStore = defineStore('tips', () => {
  const tips = ref<Tip[]>()

  const getAllTips = async () => {
    const tipsResponse = await tipsService.getAll()
    tips.value = tipsResponse
  }

  const parsedTips = computed(() => {
    return tips.value?.map((tip) => {
      return {
        ...tip,
        ...getSportAssets(tip.type),
        date: getParsedDate(tip.date, CUSTOM_SHORT_DATE_FORMAT),
        potentialReturn: parseNumberToCurrency(tip.potentialReturn),
        spent: parseNumberToCurrency(tip.spent)
      }
    })
  })

  return { getAllTips, tips, parsedTips }
})
