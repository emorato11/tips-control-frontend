<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface GraphicProps {
  data: ChartData<'line'>
}

const props = defineProps<GraphicProps>()

const graphicOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<template>
  <Line :data="props.data" :options="graphicOptions" :style="{ 'background-color': '#7fb1a8' }" />
</template>

<style scoped></style>
