<script setup lang="ts">
import { computed, onMounted } from 'vue'

import TipsterForm from '@/components/TipsterForm.vue'

import { useTipstersStore } from '@/stores/tipsters'
import type { CreateTipster, Tipster } from '@/types/Tipster'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/types/Routes'

const router = useRouter()

const tipstersStore = useTipstersStore()
const { updateTipster } = tipstersStore

const selectedTipster = computed(() => tipstersStore.selectedTipster)
const loading = computed(() => tipstersStore.loading)

const handleUpdateTipster = async (form: CreateTipster) => {
  await updateTipster((selectedTipster.value as Tipster).id, form)

  router.push({ name: RouteNames.TIPSTERS })
}

onMounted(async () => {})
</script>

<template>
  <v-container>
    <TipsterForm
      :loading="loading"
      :formValues="selectedTipster"
      isEditing
      @submitForm="handleUpdateTipster"
    />
  </v-container>
</template>

<style lang="scss" scoped></style>
