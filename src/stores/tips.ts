import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import tipsService from '@/services/tips'
import type { Balance, CreateTip, Tip, TipResume } from '@/types/Tip'
import { getSportAssets } from '@/utils/tips'
import { CUSTOM_SHORT_DATE_FORMAT, getParsedDate } from '@/utils/date'
import type { Filters } from '@/types/Filters'
import { Status } from '@/types/Common'

export const useTipsStore = defineStore('tips', () => {
  const tips = ref<Tip[]>()
  const loading = ref(false)
  const selectedTip = ref<Tip>()

  const filters = ref<Filters>({ date: [], tipster: '' })

  const parsedTips = computed<TipResume[]>(() => {
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
        parsedDate: getParsedDate(tip.date, CUSTOM_SHORT_DATE_FORMAT)
      }
    })
  })

  const balance = computed<Balance>(() => {
    return parsedTips.value.reduce(
      (accum: { spent: number; potentialReturn: number }, current: TipResume) => {
        accum.spent = accum.spent + current.spent

        const quantityToConcat =
          current.status === Status.WON
            ? current.potentialReturn - current.spent
            : current.status === Status.PENDING
              ? 0
              : current.spent * -1

        accum.potentialReturn = accum.potentialReturn + quantityToConcat
        return accum
      },
      { spent: 0, potentialReturn: 0 }
    )
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

  const selectTip = (tipId: string) => {
    selectedTip.value = tips.value?.find((tip) => tip.id === tipId)
  }

  const deleteTip = async (tipsterId: string) => {
    loading.value = true
    const response = await tipsService.delete(tipsterId)

    if (response) {
      tips.value = tips.value?.filter((tipster) => tipster.id !== tipsterId)
    }

    loading.value = false
  }

  const updateTip = async (tipsterId: string, payload: CreateTip) => {
    loading.value = true
    const response = await tipsService.update(tipsterId, payload)

    if (response) {
      // tips.value = tips.value.filter((tipster) => tipster.id !== tipsterId)
    }

    loading.value = false
  }

  return {
    getAllTips,
    createTip,
    updateFilters,
    selectTip,
    updateTip,
    deleteTip,
    tips,
    parsedTips,
    loading,
    filters,
    balance,
    selectedTip
  }
})
