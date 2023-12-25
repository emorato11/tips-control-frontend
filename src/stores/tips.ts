import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'
import type { CreateTip, Tip } from '@/types/Tip'
import { getSportAssets } from '@/utils/tips'
import { CUSTOM_SHORT_DATE_FORMAT, getParsedDate } from '@/utils/date'
import { parseNumberToCurrency } from '@/utils/currency'

export const useTipsStore = defineStore('tips', () => {
  const tips = ref<Tip[]>()
  const loading = ref(false)
  const dateFilters = ref<Date[]>([])

  const parsedTips = computed(() => {
    const filteredTips = dateFilters.value.length
      ? tips.value?.filter(
          (tip) =>
            new Date(tip.date).getTime() > dateFilters.value[0].getTime() &&
            new Date(tip.date).getTime() < dateFilters.value[1].getTime()
        )
      : tips.value

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

  const updateDateFilters = (newDateFilters: Date[]) => (dateFilters.value = newDateFilters)

  return { getAllTips, createTip, updateDateFilters, tips, parsedTips, loading, dateFilters }
})
