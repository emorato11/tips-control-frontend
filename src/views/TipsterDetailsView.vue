<script setup lang="ts">
import { computed, onMounted } from 'vue'

import TipsterForm from '@/components/TipsterForm.vue'

import { useTipstersStore } from '@/stores/tipsters'
import type { CreateTipster, Tipster } from '@/types/Tipster'
import { useRouter } from 'vue-router'

const router = useRouter()

const tipstersStore = useTipstersStore()
const { updateTipster } = tipstersStore

const selectedTipster = computed(() => tipstersStore.selectedTipster)
const loading = computed(() => tipstersStore.loading)

const handleUpdateTipster = async (form: CreateTipster) => {
  await updateTipster((selectedTipster.value as Tipster).id, form)

  router.push({ name: 'tipsters' })
}

onMounted(async () => {})
</script>

<template>
  <v-container>
    <TipsterForm
      :loading="loading"
      :form-values="selectedTipster"
      is-editing
      @submit-form="handleUpdateTipster"
    />
  </v-container>
</template>

<style lang="scss" scoped></style>
