<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

interface GraphicProps {
  data: ChartData<'doughnut'>
}

const props = defineProps<GraphicProps>()

const graphicOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
  },
  maintainAspectRatio: false
}
</script>
<template>
  <Doughnut :data="props.data" :options="graphicOptions" />
</template>

<style scoped></style>
