<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiLeadPencil,
  mdiDeleteOutline,
  mdiPlusBox,
  // mdiSync,
  mdiChartAreasplineVariant
} from '@mdi/js'

import HomeFilters from '@/components/HomeFilters.vue'
import LWChart from '@/components/LWChart.vue'

import { useTipsStore } from '@/stores'
import { DateFilterType, Status } from '@/types/Common'
import type { Filters } from '@/types/Filters'
import { parseNumberToCurrency } from '@/utils/currency'
import {
  CUSTOM_LONG_DATE_FORMAT,
  CUSTOM_LONG_DATE_FORMAT_WITH_YEAR,
  getParsedDate,
  isSameMonth,
  isSameYear
} from '@/utils/date'
import { useTipstersStore } from '@/stores/tipsters'
import { roundDecimals } from '@/utils/number'
import { RoutesName } from '@/types/Routes'
import { convertTipsToGraphicData } from '@/utils/tips'
import type { SeriesOptions, ChartOptions } from '@/types/LW'
// import { useAWSStore } from '@/stores/aws'
import { LWChartOptions, LWSeriesOptions } from '@/utils/LW'

const tipsStore = useTipsStore()
const tipstersStore = useTipstersStore()
// const awsStore = useAWSStore()
const router = useRouter()

const { getAllTips, updateFilters, deleteTip, selectTip } = tipsStore
const { getAllTipsters } = tipstersStore
// const { getStoredFiles } = awsStore

const lwChart = ref()

const parsedTips = computed(() => tipsStore.parsedTips)
const dateFilters = computed(() => tipsStore.filters.date)
const dateTypeFilters = computed(() => tipsStore.filters.dateType)
const searchFilter = computed(() => tipsStore.filters.search)
const balance = computed(() => tipsStore.balance)

const tipsters = computed(() => tipstersStore.parsedTipsters)

//Graphic data
const seriesOptions = ref<SeriesOptions>(LWSeriesOptions)
const chartOptions = ref<ChartOptions>(LWChartOptions)

const balanceLabel = computed(() => {
  if (dateFilters.value?.length) {
    const [startDate, endDate] = dateFilters.value

    if (dateTypeFilters.value === DateFilterType.SINGLE) {
      return `${getParsedDate(startDate, CUSTOM_LONG_DATE_FORMAT)}`
    }

    if (dateTypeFilters.value === DateFilterType.MONTH) {
      return getParsedDate(startDate, { month: 'long', year: 'numeric' })
    }

    const parsedStartDate = isSameMonth(startDate, endDate)
      ? startDate.getDate()
      : !isSameYear(startDate, endDate)
        ? getParsedDate(startDate, CUSTOM_LONG_DATE_FORMAT_WITH_YEAR)
        : getParsedDate(startDate, CUSTOM_LONG_DATE_FORMAT)

    return `${parsedStartDate} al ${getParsedDate(endDate, CUSTOM_LONG_DATE_FORMAT_WITH_YEAR)}`
  }

  return 'Total'
})

const loading = computed(() => tipstersStore.loading || tipsStore.loading)

const wonTips = computed(() => parsedTips.value.filter((tip) => tip.status === Status.WON).length)
const canceledTips = computed(
  () => parsedTips.value.filter((tip) => tip.status === Status.CANCELED).length
)
const failedTips = computed(
  () => parsedTips.value.filter((tip) => tip.status === Status.FAILED).length
)
const pendingTips = computed(
  () => parsedTips.value.filter((tip) => tip.status === Status.PENDING).length
)

const wonPercentaje = computed(() => {
  return roundDecimals((wonTips.value / (wonTips.value + failedTips.value)) * 100)
})

const graphicData = computed<{ time: string; value: number }[]>(() => {
  return convertTipsToGraphicData(parsedTips.value)
})

const getColorByStatus = (status: Status) => {
  if (status === Status.PENDING) return 'orange'
  if (status === Status.FAILED) return 'error'
  if (status === Status.CANCELED) return 'grey'
  return 'success'
}

const handleUpdateFilters = (filters: Filters) => {
  fitChartContent()
  updateFilters(filters)
}

const fitChartContent = () => {
  lwChart.value.fitContent()
}

const handleRemoveTip = async (id: string) => {
  await deleteTip(id)
}
const handleUpdateTip = async (id: string) => {
  selectTip(id)

  router.push({ name: RoutesName.TIP_DETAILS, params: { id } })
}

const goToCreateTip = () => {
  router.push({ name: RoutesName.CREATE_TIP })
}

// const getStoredTips = async () => {
//   await getStoredFiles()
// }

onMounted(async () => {
  await getAllTips()
  await getAllTipsters()
})
</script>
<template>
  <v-container>
    <v-data-iterator
      :items="parsedTips"
      itemValue="name"
      :loading="loading"
      :itemsPerPage="12"
      :search="searchFilter"
    >
      <template #no-data>
        <v-skeleton-loader v-if="loading" />
      </template>
      <template #header>
        <HomeFilters
          :tipsters="tipsters"
          :filters="tipsStore.filters"
          @updateFilters="handleUpdateFilters"
        />

        <v-row dense class="d-flex space-around">
          <v-col>
            <!-- <v-btn :prependIcon="mdiSync" color="secondary" @click="getStoredTips">Sync</v-btn> -->
            <v-btn :prependIcon="mdiPlusBox" color="primary" @click="goToCreateTip">
              Crear Tip
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn
              :prependIcon="mdiChartAreasplineVariant"
              color="success"
              @click="fitChartContent"
            >
              Ajustar chart
            </v-btn>
          </v-col>
        </v-row>

        <v-card class="my-4 pa-0" variant="tonal" color="primary">
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
            {{ balanceLabel }}
          </v-card-title>
          <v-row dense class="py-2 px-4">
            <v-col cols="6" lg="3" md="4">
              <p>
                +/-:
                <span
                  :class="balance.potentialReturn >= 0 ? 'text-success' : 'text-error'"
                  class="font-weight-bold"
                >
                  {{ parseNumberToCurrency(balance.potentialReturn) }}
                </span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p>
                Pendiente:
                <span class="font-weight-bold text-orange">
                  {{ parseNumberToCurrency(balance.pending) }}
                </span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p>
                Total tips:
                <span class="font-weight-bold">{{ parsedTips.length }}</span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p class="text-success">
                Tips Ganados:
                <span class="font-weight-bold">{{ wonTips }}</span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p class="text-error">
                Tips Perdidos:
                <span class="font-weight-bold">{{ failedTips }}</span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p class="text-orange">
                Tips Pendientes:
                <span class="font-weight-bold">{{ pendingTips }}</span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p class="text-grey">
                Tips Cancelados:
                <span class="font-weight-bold">{{ canceledTips }}</span>
              </p>
            </v-col>
            <v-col cols="6" lg="3" md="4">
              <p>
                Porcentaje:
                <span
                  class="font-weight-bold"
                  :class="wonPercentaje >= 50 ? 'text-success' : 'text-error'"
                >
                  {{ wonPercentaje }}%
                </span>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template #default="{ items, isExpanded, toggleExpand }">
        <v-container class="pa-0" fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.raw.title"
              cols="auto"
              lg="3"
              md="4"
              sm="6"
              class="w-100"
            >
              <v-card border flat variant="outlined" :color="getColorByStatus(item.raw.status)">
                <v-card-title class="d-flex align-center justify-start ga-1">
                  <v-icon :color="item.raw.color" :icon="item.raw.icon" start size="18" />

                  <span class="font-weight-bold text-center text-truncate">
                    {{ item.raw.name }}
                  </span>

                  <span class="ml-auto text-body-2 font-weight-thin">
                    {{ item.raw.parsedDate }}
                  </span>
                </v-card-title>

                <v-divider />

                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-chip color="primary" variant="tonal"> {{ item.raw.tipster }} </v-chip>
                    <v-chip
                      :color="getColorByStatus(item.raw.status)"
                      variant="tonal"
                      class="text-capitalize"
                    >
                      {{ item.raw.status }}
                    </v-chip>
                  </div>

                  <div class="d-flex flex-column py-4">
                    <p class="text-body-2 font-weight-500">
                      Invertido:
                      <span class="text-body-1 font-weight-bold">
                        {{ parseNumberToCurrency(item.raw.spent) }}
                      </span>
                    </p>
                    <p class="text-body-2 font-weight-500">
                      Posibles ganancias:
                      <span class="text-body-1 font-weight-bold"
                        >{{ parseNumberToCurrency(item.raw.potentialReturn) }}
                      </span>
                    </p>
                  </div>

                  <v-row dense>
                    <v-col v-for="selection in item.raw.selections" :key="selection.id">
                      <v-divider
                        :thickness="4"
                        class="border-opacity-75"
                        :color="getColorByStatus(selection.status)"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>

                <div class="d-flex ga-2 px-4">
                  <v-switch
                    :modelValue="isExpanded(item as any)"
                    :label="`${isExpanded(item as any) ? 'Ocultar' : 'Mostrar'} selecciones`"
                    density="compact"
                    inset
                    @click="() => toggleExpand(item as any)"
                  />

                  <v-btn
                    class="align-self-center"
                    elevation="4"
                    variant="outlined"
                    size="small"
                    color="orange"
                    :icon="mdiLeadPencil"
                    @click="handleUpdateTip(item.raw.id)"
                  />

                  <v-btn
                    class="align-self-center"
                    elevation="4"
                    variant="outlined"
                    size="small"
                    color="error"
                    :icon="mdiDeleteOutline"
                    @click="handleRemoveTip(item.raw.id)"
                  />
                </div>

                <v-divider />

                <v-expand-transition>
                  <div v-if="isExpanded(item as any)">
                    <v-list density="compact">
                      <v-list-item v-for="selection in item.raw.selections" :key="selection.id">
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-body-2 font-weight-bold">{{ selection.name }}</span>
                          <v-chip
                            :color="getColorByStatus(selection.status)"
                            variant="tonal"
                            class="text-capitalize"
                          >
                            {{ selection.status }}
                          </v-chip>
                        </div>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template #footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            :icon="mdiArrowLeft"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          />

          <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

          <v-btn
            :disabled="page >= pageCount"
            :icon="mdiArrowRight"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          />
        </div>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<style scoped lang="scss">
.datepicker {
  height: 57px;
}
</style>
