<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import {
  CUSTOM_LONG_DATE_FORMAT,
  CUSTOM_SHORT_DATE_FORMAT,
  getParsedDate,
  createDatesForFilter
} from '@/utils/date'
import type { Filters } from '@/types/Filters'

interface DateFilterProps {
  filters: Filters
}

const props = defineProps<DateFilterProps>()

enum DateFilterType {
  SINGLE = 'single',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range'
}
const emit = defineEmits<{
  (e: 'updateFilters', value: Filters): void
}>()

const datepicker = ref()
const date = ref<Date | Date[]>()
const selectedDateFilter = ref()

const dateFilterOptions = ref([
  { state: 'Día concreto', value: DateFilterType.SINGLE },
  { state: 'Semana', value: DateFilterType.WEEK },
  { state: 'Mes', value: DateFilterType.MONTH },
  { state: 'Personalizado', value: DateFilterType.RANGE }
])
const enabledMonthPicker = ref(false)
const enabledRangePicker = ref(false)
const enabledWeekPicker = ref(false)

const handleUpdateCalendar = () => {
  updateCalendarMode()

  emit('updateFilters', { dateType: selectedDateFilter.value })

  datepicker.value.openMenu()
}

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

const parseDates = () => {
  return date.value ? createDatesForFilter(date.value, selectedDateFilter.value) : []
}

const updateDateFilters = () => {
  const dates = parseDates()
  emit('updateFilters', { date: dates })
}

onMounted(() => {
  if (props.filters.dateType) {
    selectedDateFilter.value = props.filters.dateType
  }
  if (props.filters.date)
    date.value =
      selectedDateFilter.value === DateFilterType.SINGLE
        ? props.filters.date[0]
        : props.filters.date
})
</script>
<template>
  <v-col cols="6" lg="4" md="4" sm="6">
    <v-select
      v-model="selectedDateFilter"
      class="flex-fill"
      label="Filtro de fecha"
      :items="dateFilterOptions"
      itemTitle="state"
      itemValue="value"
      variant="outlined"
      @update:modelValue="handleUpdateCalendar"
    />
  </v-col>
  <v-col cols="6" lg="4" md="4" sm="6">
    <VueDatePicker
      ref="datepicker"
      v-model="date"
      class="datepicker w-auto"
      placeholder="Calendario"
      :enableTimePicker="true"
      :monthPicker="enabledMonthPicker"
      :range="enabledRangePicker"
      :weekPicker="enabledWeekPicker"
      :format="format"
      @update:modelValue="updateDateFilters"
      autoApply
    />
  </v-col>
</template>

<style lang="scss">
.datepicker {
  input {
    height: 56px;
    border-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
