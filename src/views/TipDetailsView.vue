<script setup lang="ts">
import { computed, onMounted } from 'vue'

import TipForm from '@/components/TipForm.vue'

import { useTipsStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { CreateTip, Tip } from '@/types/Tip'
import { useTipstersStore } from '@/stores/tipsters'
import { RoutesName } from '@/types/Routes'

const router = useRouter()

const tipsStore = useTipsStore()
const tipstersStore = useTipstersStore()
const { updateTip } = tipsStore

const selectedTip = computed(() => tipsStore.selectedTip)
const loading = computed(() => tipsStore.loading)
const tipsters = computed(() => tipstersStore.parsedTipsters)

const handleUpdateTip = async (form: CreateTip) => {
  await updateTip((selectedTip.value as Tip).id, form)

  router.push({ name: RoutesName.HOME })
}

onMounted(async () => {})
</script>

<template>
  <v-container class="py-0">
    <TipForm
      :loading="loading"
      :formValues="selectedTip"
      :tipsters="tipsters"
      isEditing
      @submitForm="handleUpdateTip"
    />
  </v-container>
</template>

<style lang="scss" scoped></style>
