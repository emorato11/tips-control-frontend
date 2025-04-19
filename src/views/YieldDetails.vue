<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'
import { useRoute } from 'vue-router'

import DateFilter from '@/components/Filters/Date.vue'
import LWChart from '@/components/LWChart.vue'

import { usePaymentsStore } from '@/stores/payments'
import { useYieldStore } from '@/stores/yield'
import { useTipstersStore } from '@/stores/tipsters'

import type { Tipster } from '@/types/Tipster'
import type { Filters } from '@/types/Filters'
import type { SeriesOptions, ChartOptions } from '@/types/LW'

import { LWChartOptions, LWSeriesOptions } from '@/utils/LW'
import { PAYMENTS_TYPES } from '@/utils/payments'
import { convertYieldToGraphicData } from '@/utils/yield'
import { parseNumberToCurrency } from '@/utils/currency'
import { onUnmounted } from 'vue'

const paymentsStore = usePaymentsStore()
const tipstersStore = useTipstersStore()
const yieldStore = useYieldStore()
const router = useRouter()
const route = useRoute()

const tab = ref('yield')
const name = ref('')
const spent = ref(null)
const type = ref(null)
const selectedTipster = ref<Tipster | null>(null)

const seriesOptions = ref<SeriesOptions>(LWSeriesOptions)
const chartOptions = ref<ChartOptions>(LWChartOptions)

const { updateFilters, resetSelectedYield } = yieldStore
const loading = computed(() => paymentsStore.loading)
const tipsters = computed(() => tipstersStore.tipsters)
const filters = computed(() => yieldStore.filters)
const selectedYield = computed(() => yieldStore.selectedYield)

const tipsBalance = computed(() => selectedYield.value?.tipsYield || 0)
const paymentsBalance = computed(() => selectedYield.value?.totalPayments || 0)

const handleCreatePayment = async () => {
  if (!name.value || !spent.value || !type.value || !selectedTipster.value) return

  const typeName = PAYMENTS_TYPES.find((pType) => pType.id === type.value)?.name || ''

  await paymentsStore.createPayment({
    name: name.value,
    spent: spent.value,
    typeId: type.value,
    typeName,
    tipsterId: selectedTipster.value.id,
    tipsterName: selectedTipster.value.name
  })

  name.value = ''
  spent.value = null
  type.value = null
}

const goBack = () => {
  router.go(-1)
}

const handleUpdateFilters = (filters: Filters) => {
  updateFilters(filters)
}

const graphicData = computed<{ time: string; value: number }[]>(() => {
  return convertYieldToGraphicData({
    tips: selectedYield.value?.tips || [],
    payments: selectedYield.value?.payments || []
  })
})

onMounted(async () => {
  const tipsterId = route.params.id as string
  if (!tipsters.value.length) {
    await tipstersStore.getAllTipsters()
  }
  selectedTipster.value = tipsters.value?.find((tipster) => tipster.id === tipsterId) || null

  await paymentsStore.getAllPaymentsByTipster(tipsterId)

  await yieldStore.getYieldByTipster(tipsterId)
})

onUnmounted(() => {
  resetSelectedYield()
})
</script>

<template>
  <v-container>
    <v-col cols="6">
      <v-btn variant="text" size="small" :prependIcon="mdiArrowLeft" @click="goBack">
        Volver a vista general
      </v-btn>
    </v-col>
    <v-tabs v-model="tab" fixedTabs bgColor="primary">
      <v-tab value="yield">Rentabilidad</v-tab>
      <v-tab value="create">Añadir Pago</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="yield">
        <v-container>
          <v-row dense>
            <DateFilter :filters="filters" @updateFilters="handleUpdateFilters" />
          </v-row>

          <v-card class="my-4 pa-0" variant="tonal" color="primary">
            <v-card-title class="poetsen-one-regular">
              {{ selectedTipster?.name }}
            </v-card-title>
            <LWChart
              v-if="graphicData.length"
              type="Baseline"
              :data="graphicData"
              :autosize="true"
              :chart-options="chartOptions"
              :series-options="seriesOptions"
              ref="lwChart"
            />
          </v-card>
          <v-card class="mb-4 pa-0" variant="tonal" color="primary">
            <v-card-title variant="tonal" color="primary" class="text-body-2 text-wrap pb-0">
              Desglose general
            </v-card-title>
            <v-row dense class="py-2 px-4">
              <v-col cols="6" lg="3" md="4">
                <p>
                  Balance en Tips:
                  <span
                    :class="tipsBalance >= 0 ? 'text-success' : 'text-error'"
                    class="font-weight-bold"
                  >
                    {{ parseNumberToCurrency(tipsBalance) }}
                  </span>
                </p>
              </v-col>
              <v-col cols="6" lg="3" md="4">
                <p>
                  Total Pagos:
                  <span class="font-weight-bold text-info">
                    {{ parseNumberToCurrency(paymentsBalance) }}
                  </span>
                </p>
              </v-col>
            </v-row>
          </v-card>

          <div class="text-subtitle-2 mt-4 mb-2">Pagos</div>

          <v-expansion-panels variant="accordion">
            <v-expansion-panel
              v-for="payment in selectedYield?.payments"
              :key="payment.id"
              :text="`Total pagado: ${parseNumberToCurrency(payment.spent)}`"
              :title="`${payment.typeName}: ${payment.name}`"
            ></v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </v-window-item>

      <v-window-item value="create">
        <v-form @submit.prevent="handleCreatePayment" ref="form">
          <v-container>
            <v-row dense>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-text-field
                  v-model="name"
                  :rules="[(v) => !!v || 'Requerido']"
                  label="Descripción pago"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-select
                  v-model="type"
                  :items="PAYMENTS_TYPES"
                  :rules="[(v) => !!v || 'Requerido']"
                  label="Tipo de pago"
                  variant="outlined"
                  required
                  itemTitle="name"
                  itemValue="id"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="spent"
                  type="number"
                  hideDetails
                  variant="outlined"
                  label="Cantidad"
                  :rules="[(v) => !!v || 'Requerido']"
                />
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              block
              class="mt-2"
              :loading="loading"
              variant="elevated"
              color="primary"
            >
              Submit
            </v-btn>
          </v-container>
        </v-form>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style lang="scss" scoped>
.poetsen-one-regular {
  font-family: 'Poetsen One', sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
