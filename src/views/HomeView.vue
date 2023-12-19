<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const { getAllTips } = counterStore

const tips = computed(() => counterStore.tips)

onMounted(async () => {
  await getAllTips()
})
</script>
<template>
  <div>
    <div v-for="tip in tips" :key="tip.id">
      {{ tip.name }}
    </div>
  </div>
</template>

<style scoped></style>
