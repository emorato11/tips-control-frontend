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

import { useScreenSize } from '@/composables/useScreenSize'
import { ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface GraphicProps {
  data: ChartData<'bar'>
}

const { isMobile } = useScreenSize()

const props = defineProps<GraphicProps>()

const graphicOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: isMobile.value ? 'y' : 'x',
  scales: {
    x: {
      stacked: true
    },
    y: {
      stacked: true
    }
  }
})
</script>
<template>
  <Bar :data="props.data" :options="graphicOptions" />
</template>

<style scoped></style>
