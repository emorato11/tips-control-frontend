<script setup lang="ts">
import { computed, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {
  CUSTOM_LONG_DATE_FORMAT,
  CUSTOM_SHORT_DATE_FORMAT,
  getParsedDate,
  createDatesForFilter
} from '@/utils/date'

// const props = defineProps({
//   date: Date
// })

enum DateFilterType {
  SINGLE = 'single',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range'
}
const emit = defineEmits<{
  (e: 'updateRangeDates', value: Date[]): void
}>()

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

const enabledCalendar = computed(() => selectedDateFilter.value)

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

const updateRangeDates = () => {
  const dates = date.value ? createDatesForFilter(date.value, selectedDateFilter.value) : []
  emit('updateRangeDates', dates)
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
      >
      </v-select>
    </v-col>
    <v-col cols="6" lg="4" md="4" sm="6">
      <VueDatePicker
        v-model="date"
        class="datepicker w-auto"
        :enable-time-picker="true"
        :month-picker="enabledMonthPicker"
        :range="enabledRangePicker"
        :week-picker="enabledWeekPicker"
        :disabled="!enabledCalendar"
        :format="format"
        @update:model-value="updateRangeDates"
        auto-apply
      />
    </v-col>
    <v-col cols="6" lg="4" md="4" sm="6">
      <v-select
        class="flex-fill"
        label="Filtro de Tipster"
        :items="['Tipster Apuesta', 'BetInsider']"
        item-title="state"
        item-value="value"
        variant="outlined"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<style scoped></style>
