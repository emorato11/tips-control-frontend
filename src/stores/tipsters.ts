import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filters } from '@/types/Filters'
import type { CreateTipster, Tipster } from '@/types/Tipster'
import tipstersService from '@/services/tipsters'
import { getSportAssets } from '@/utils/tips'

export const useTipstersStore = defineStore('tipsters', () => {
  const tipsters = ref<Tipster[]>([])
  const loading = ref(false)
  const filters = ref<Filters>({ date: [], tipster: '' })

  const parsedTipsters = computed<Tipster[]>(() => {
    const filteredTipsters: Tipster[] = tipsters.value || []

    return filteredTipsters?.map((tipster) => {
      return {
        ...tipster,
        ...getSportAssets(tipster.type)
      }
    })
  })

  const getAllTipsters = async () => {
    loading.value = true
    const tipstersResponse = await tipstersService.getAll()
    tipsters.value = tipstersResponse || []

    loading.value = false
  }

  const createTipster = async (newTipster: CreateTipster) => {
    loading.value = true
    const tipsterCreated = await tipstersService.create(newTipster)

    if (tipsterCreated) {
      tipsters.value = [...tipsters.value, tipsterCreated]
    }

    loading.value = false
  }

  const updateFilters = (filt: Filters) => (filters.value = { ...filters.value, ...filt })

  return {
    getAllTipsters,
    createTipster,
    updateFilters,
    tipsters,
    parsedTipsters,
    loading,
    filters
  }
})
