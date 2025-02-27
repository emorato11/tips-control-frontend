<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
// import { mdiArrowLeft, mdiArrowRight, mdiDeleteOutline, mdiLeadPencil } from '@mdi/js'

import GraphicBar from '@/components/GraphicBar.vue'

import { useTipstersStore } from '@/stores/tipsters'
import type { Tipster } from '@/types/Tipster'
// import { useRouter } from 'vue-router'
// import { RoutesName } from '@/types/Routes'

const tipstersStore = useTipstersStore()
// const router = useRouter()

const { getAllTipsters } = tipstersStore

// const tab = ref()
// const search = ref()
const data = ref({
  labels: ['Todos'],
  datasets: [
    {
      label: 'TennisInsider',
      backgroundColor: '#f87979',
      data: [40]
    },
    {
      label: 'Tipster Apuesta',
      backgroundColor: 'grey',
      data: [10]
    }
  ]
})

const parsedTipsters = computed(() => tipstersStore.parsedTipsters)
const loading = computed(() => tipstersStore.loading)

onMounted(async () => {
  if (!parsedTipsters.value.length) {
    await getAllTipsters()
  }
})

const selectTipster = (tipster: Tipster) => {
  console.log(tipster)
}
</script>

<template>
  <v-container>
    <v-skeleton-loader :loading="loading" type="list-item-two-line" class="w-100">
      <v-row dense class="my-2 justify-center">
        <v-chip
          v-for="tipster in parsedTipsters"
          :prepend-icon="tipster.icon"
          color="primary"
          variant="outlined"
          size="x-large"
          class="ma-2"
          @click="selectTipster(tipster)"
        >
          {{ tipster.name }}
        </v-chip>
      </v-row>
      <v-row dense class="my-2 justify-center">
        <GraphicBar :data="data" />
      </v-row>
    </v-skeleton-loader>
  </v-container>
</template>

<style lang="scss" scoped></style>
