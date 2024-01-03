<script setup lang="ts">
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import type { Tipster } from '@/types/Tipster'

interface HomeFiltersProps {
  tipsters: Tipster[]
}
import {
  CUSTOM_LONG_DATE_FORMAT,
  CUSTOM_SHORT_DATE_FORMAT,
  getParsedDate,
  createDatesForFilter
} from '@/utils/date'
import type { Filters } from '@/types/Filters'
import { Status } from '@/types/Common'

const props = defineProps<HomeFiltersProps>()

const statusOptions = ref(Object.values(Status))

enum DateFilterType {
  SINGLE = 'single',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range'
}
const emit = defineEmits<{
  (e: 'updateFilters', value: Filters): void
  (e: 'updateDateType', value: DateFilterType): void
}>()

const datepicker = ref()
const date = ref<Date | Date[]>()
const selectedDateFilter = ref()
const selectedTipsterFilter = ref()
const selectedStatusFilter = ref()

const dateFilterOptions = ref([
  { state: 'Día concreto', value: DateFilterType.SINGLE },
  { state: 'Semana', value: DateFilterType.WEEK },
  { state: 'Mes', value: DateFilterType.MONTH },
  { state: 'Personalizado', value: DateFilterType.RANGE }
])
const enabledMonthPicker = ref(false)
const enabledRangePicker = ref(false)
const enabledWeekPicker = ref(false)

const updateCalendarMode = () => {
  if (selectedDateFilter.value === DateFilterType.RANGE) {
    enabledMonthPicker.value = false
    enabledRangePicker.value = true
    enabledWeekPicker.value = false
  } else if (selectedDateFilter.value === DateFilterType.WEEK) {
    enabledMonthPicker.value = false
    enabledRangePicker.value = false
    enabledWeekPicker.value = true
  } else if (selectedDateFilter.value === DateFilterType.MONTH) {
    enabledMonthPicker.value = true
    enabledRangePicker.value = false
    enabledWeekPicker.value = false
  } else {
    enabledMonthPicker.value = false
    enabledRangePicker.value = false
    enabledWeekPicker.value = false
  }
  emit('updateDateType', selectedDateFilter.value)

  datepicker.value.openMenu()
}

const format = (dates: Date | Date[]) => {
  if (Array.isArray(dates)) {
    return dates.reduce((accum, current, idx) => {
      return `${accum}${idx > 0 ? ' - ' : ''}${getParsedDate(current, CUSTOM_SHORT_DATE_FORMAT)}`
    }, '')
  }

  if (enabledMonthPicker.value) {
    return `${getParsedDate(dates, { month: 'long', year: 'numeric' })}`
  }

  return getParsedDate(dates, CUSTOM_LONG_DATE_FORMAT)
}

const updateDateFilters = () => {
  const dates = date.value ? createDatesForFilter(date.value, selectedDateFilter.value) : []
  emit('updateFilters', { date: dates })
}

const updateTipsterFilter = () => {
  emit('updateFilters', { tipster: selectedTipsterFilter.value })
}

const updateStatusFilter = () => {
  emit('updateFilters', { status: selectedStatusFilter.value })
}
</script>
<template>
  <v-row dense>
    <v-col cols="6" lg="4" md="4" sm="6">
      <v-select
        v-model="selectedDateFilter"
        class="flex-fill"
        label="Filtro de fecha"
        :items="dateFilterOptions"
        item-title="state"
        item-value="value"
        variant="outlined"
        @update:modelValue="updateCalendarMode"
      />
    </v-col>
    <v-col cols="6" lg="4" md="4" sm="6">
      <VueDatePicker
        ref="datepicker"
        v-model="date"
        class="datepicker w-auto"
        :enable-time-picker="true"
        :month-picker="enabledMonthPicker"
        :range="enabledRangePicker"
        :week-picker="enabledWeekPicker"
        :format="format"
        @update:model-value="updateDateFilters"
        auto-apply
      />
    </v-col>
    <v-col cols="6" lg="4" md="4" sm="6">
      <v-select
        v-model="selectedTipsterFilter"
        clearable
        class="flex-fill"
        label="Filtro de Tipster"
        :items="props.tipsters"
        item-title="name"
        item-value="value"
        variant="outlined"
        @update:modelValue="updateTipsterFilter"
      />
    </v-col>
    <v-col cols="6" lg="4" md="4" sm="6">
      <v-select
        v-model="selectedStatusFilter"
        clearable
        class="flex-fill"
        label="Filtro de Status"
        :items="statusOptions"
        variant="outlined"
        @update:modelValue="updateStatusFilter"
      />
    </v-col>
  </v-row>
</template>

<style scoped></style>
