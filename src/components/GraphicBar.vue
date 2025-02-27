<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface GraphicProps {
  data: ChartData<'bar'>
}

const props = defineProps<GraphicProps>()

const graphicOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<template>
  <Bar :data="props.data" :options="graphicOptions" />
</template>

<style scoped></style>
