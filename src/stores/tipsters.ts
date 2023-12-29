import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Filters } from '@/types/Filters'
import type { CreateTipster, Tipster } from '@/types/Tipster'
import tipstersService from '@/services/tipsters'
import { getSportAssets } from '@/utils/tips'

export const useTipstersStore = defineStore('tipsters', () => {
  const tipsters = ref<Tipster[]>([])
  const selectedTipster = ref<Tipster>()
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

  const deleteTipster = async (tipsterId: string) => {
    loading.value = true
    const response = await tipstersService.delete(tipsterId)

    if (response) {
      tipsters.value = tipsters.value.filter((tipster) => tipster.id !== tipsterId)
    }

    loading.value = false
  }

  const updateTipster = async (tipsterId: string, payload: CreateTipster) => {
    loading.value = true
    const response = await tipstersService.update(tipsterId, payload)

    if (response) {
      // tipsters.value = tipsters.value.filter((tipster) => tipster.id !== tipsterId)
    }

    loading.value = false
  }

  const selectTipster = (tipsterId: string) => {
    selectedTipster.value = tipsters.value.find((tipster) => tipster.id === tipsterId)
  }

  const updateFilters = (filt: Filters) => (filters.value = { ...filters.value, ...filt })

  return {
    getAllTipsters,
    createTipster,
    updateFilters,
    deleteTipster,
    selectTipster,
    updateTipster,
    selectedTipster,
    tipsters,
    parsedTipsters,
    loading,
    filters
  }
})
