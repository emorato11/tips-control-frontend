<script setup lang="ts">
import { computed, onMounted } from 'vue'

import '@vuepic/vue-datepicker/dist/main.css'

import TipForm from '@/components/TipForm.vue'

import type { CreateTip } from '@/types/Tip'
import { useTipsStore } from '@/stores'
import { useTipstersStore } from '@/stores/tipsters'

const tipsStore = useTipsStore()
const tipstersStore = useTipstersStore()

const { createTip } = tipsStore
const { getAllTipsters } = tipstersStore

// const tipNameRules = [
//   (value: string) => {
//     if (value) return true

//     return 'Requerido'
//   }
// ]

const loading = computed(() => tipsStore.loading)
const tipsters = computed(() => tipstersStore.parsedTipsters)

const handleCreateTip = async (payload: CreateTip) => {
  await createTip(payload)
}

onMounted(async () => {
  await getAllTipsters()
})
</script>

<template>
  <TipForm :loading="loading" :tipsters="tipsters" @submitForm="handleCreateTip" />
</template>

<style scoped></style>
