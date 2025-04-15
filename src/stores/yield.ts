import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import yieldService from '@/services/yield'
import type { Yield, YieldResume } from '@/types/Yield'

export const useYieldStore = defineStore('yield', () => {
  const loading = ref(false)
  const selectedYield = ref<Yield | null>(null)
  const yieldResume = ref<YieldResume[] | []>([])

  const yieldAccumulatedByAll = computed(() => {
    return (
      yieldResume.value?.reduce((acc, y) => {
        return acc + y.yield
      }, 0) || 0
    )
  })

  const getYieldByTipster = async (tipsterId: string) => {
    loading.value = true
    const yieldResponse = await yieldService.getById(tipsterId)
    selectedYield.value = yieldResponse || null

    loading.value = false
  }
  const getYieldResume = async () => {
    loading.value = true
    const yieldResponse = await yieldService.getResume()
    yieldResume.value = yieldResponse || []

    loading.value = false
  }

  return {
    selectedYield,
    yieldResume,
    yieldAccumulatedByAll,
    getYieldByTipster,
    getYieldResume,
    loading
  }
})
