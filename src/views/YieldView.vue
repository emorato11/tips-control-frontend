<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import Bar from '@/components/GraphicBar.vue'
// import Doughnut from '@/components/GraphicDoughnut.vue'

import { useTipstersStore } from '@/stores/tipsters'
import { parseNumberToCurrency } from '@/utils/currency'

import { useRouter } from 'vue-router'
import { RoutesName } from '@/types/Routes'
import { useYieldStore } from '@/stores/yield'
import type { ChartData } from 'chart.js'

const tipstersStore = useTipstersStore()
const yieldStore = useYieldStore()
const router = useRouter()

const { getAllTipsters } = tipstersStore
const { getYieldResume } = yieldStore

const parsedTipsters = computed(() => tipstersStore.parsedTipsters)
const yieldResume = computed(() => yieldStore.yieldResume)
const yieldAccumulatedByAll = computed(() => yieldStore.yieldAccumulatedByAll)
const loading = computed(() => tipstersStore.loading)

const chartData = ref<ChartData<'bar'>>()
// const doughnutData = ref<ChartData<'doughnut'>>({
//   labels: ['Ganadas', 'Pendientes', 'Perdidas'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [1, 5, 24],
//       backgroundColor: [
//         '#28A745',
//         '#FFC107',
//         '#DC3545',
//       ]
//     }
//   ]
// })

onMounted(async () => {
  if (!parsedTipsters.value.length) {
    await getAllTipsters()
  }
  await getYieldResume()
  setChartData()
})

const goToTipsterYield = (id: string) => {
  router.push({ name: RoutesName.YIELD_DETAILS, params: { id } })
}

const setChartData = () => {
  chartData.value = {
    labels: yieldResume.value.map((y) => y.tipsterName),
    datasets: [
      {
        label: 'Resumen Tips',
        backgroundColor: '#1280afcc',
        data: yieldResume.value.map((t) => t.tipsYield),
        borderWidth: 2,
        borderRadius: 10
        // borderSkipped: false
      },
      {
        label: 'Pagos',
        backgroundColor: '#c5a649e6',
        data: yieldResume.value.map((t) => t.paymentsYield * -1),
        borderWidth: 2,
        borderRadius: 10
      }
    ]
  }
}
</script>

<template>
  <v-container>
    <v-skeleton-loader :loading="loading" type="list-item-two-line" class="w-100">
      
      <v-row class="w-100">
        <v-card class="mb-4 pa-4">
          <v-card-title>
            Balance General: {{ parseNumberToCurrency(yieldAccumulatedByAll) }}
          </v-card-title>
        </v-card>
      </v-row>
      <v-row>
        <v-col v-for="tipster in parsedTipsters" :key="tipster.id" sm="6" class="px-1">
          <v-btn color="primary" size="small" block @click="goToTipsterYield(tipster.id)">
            {{ tipster.name }}
          </v-btn>
        </v-col>
      </v-row>

      <v-card v-if="chartData" class="mt-4 pa-4 w-100 chart-bar">
        <Bar :data="chartData" />
      </v-card>
      <!-- <v-card v-if="doughnutData" class="mt-4 pa-4 w-100">
        <Doughnut :data="doughnutData" />
      </v-card> -->
    </v-skeleton-loader>
  </v-container>
</template>

<style lang="scss" scoped>
.chart-bar {
  min-height: 400px;
}
</style>
