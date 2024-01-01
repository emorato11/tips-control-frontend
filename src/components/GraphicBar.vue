<script setup lang="ts">
import type { ChartData } from 'chart.js'
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

const graphicOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>
<template>
  <Line :data="props.data" :options="graphicOptions" />
</template>

<style scoped></style>
