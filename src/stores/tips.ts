import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'
import type { CreateTip, Tip } from '@/types/Tip'
import { getSportAssets } from '@/utils/tips'
import { CUSTOM_SHORT_DATE_FORMAT, getParsedDate } from '@/utils/date'
import { parseNumberToCurrency } from '@/utils/currency'
import type { Filters } from '@/types/Filters'

export const useTipsStore = defineStore('tips', () => {
  const tips = ref<Tip[]>()
  const loading = ref(false)
  const filters = ref<Filters>({ date: [], tipster: '' })

  const parsedTips = computed(() => {
    let filteredTips: Tip[] = tips.value || []

    if (filters.value.date?.length) {
      const [startDate, endDate] = filters.value.date

      if (startDate && endDate) {
        filteredTips = filteredTips?.filter(
          (tip) =>
            new Date(tip.date).getTime() > startDate.getTime() &&
            new Date(tip.date).getTime() < endDate.getTime()
        )
      }
    }

    if (filters.value.tipster) {
      filteredTips = filteredTips.filter((tip) => tip.tipster === filters.value.tipster)
    }

    return filteredTips?.map((tip) => {
      return {
        ...tip,
        ...getSportAssets(tip.type),
        date: getParsedDate(tip.date, CUSTOM_SHORT_DATE_FORMAT),
        potentialReturn: parseNumberToCurrency(tip.potentialReturn),
        spent: parseNumberToCurrency(tip.spent)
      }
    })
  })

  const getAllTips = async () => {
    loading.value = true
    const tipsResponse = await tipsService.getAll()
    tips.value = tipsResponse

    loading.value = false
  }

  const createTip = async (newTip: CreateTip) => {
    loading.value = true
    await tipsService.create(newTip)
    loading.value = false
  }

  const updateFilters = (filt: Filters) => (filters.value = { ...filters.value, ...filt })

  return {
    getAllTips,
    createTip,
    updateFilters,
    tips,
    parsedTips,
    loading
  }
})
