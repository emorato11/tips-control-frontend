<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { mdiMagnify } from '@mdi/js'
import debounce from 'debounce'

import DateFilter from '@/components/Filters/Date.vue'

import type { Tipster } from '@/types/Tipster'
import type { Filters } from '@/types/Filters'
import { Status } from '@/types/Common'

const props = defineProps<HomeFiltersProps>()

const statusOptions = ref(Object.values(Status))

interface HomeFiltersProps {
  tipsters: Tipster[]
  filters: Filters
}
enum DateFilterType {
  SINGLE = 'single',
  WEEK = 'week',
  MONTH = 'month',
  RANGE = 'range'
}
const emit = defineEmits<{
  (e: 'updateFilters', value: Filters): void
}>()

const date = ref<Date | Date[]>()
const search = ref()
const selectedDateFilter = ref()
const selectedTipsterFilter = ref()
const selectedStatusFilter = ref()

const updateSearch = debounce(() => {
  emit('updateFilters', { search: search.value })
}, 300)

const resetSearch = () => {
  emit('updateFilters', { search: '' })
}

const updateDateFilters = (filters: Filters) => {
  emit('updateFilters', { ...filters })
}

const updateTipsterFilter = () => {
  emit('updateFilters', { tipster: selectedTipsterFilter.value })
}

const updateStatusFilter = () => {
  emit('updateFilters', { status: selectedStatusFilter.value })
}

onMounted(() => {
  if (props.filters.tipster) selectedTipsterFilter.value = props.filters.tipster
  if (props.filters.status) selectedStatusFilter.value = props.filters.status
  if (props.filters.dateType) {
    selectedDateFilter.value = props.filters.dateType
  }
  if (props.filters.date)
    date.value =
      selectedDateFilter.value === DateFilterType.SINGLE
        ? props.filters.date[0]
        : props.filters.date
  if (props.filters.search) search.value = props.filters.search
})
</script>
<template>
  <v-row dense>
    <DateFilter :filters="filters" @updateFilters="updateDateFilters" />

    <v-col cols="6" lg="4" md="4" sm="6">
      <v-select
        v-model="selectedTipsterFilter"
        clearable
        class="flex-fill"
        label="Filtro de Tipster"
        :items="props.tipsters"
        itemTitle="name"
        itemValue="id"
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
    <v-col cols="6" lg="4" md="4" sm="6">
      <v-text-field
        v-model="search"
        clearable
        density="comfortable"
        hideDetails
        placeholder="Search"
        :prependInnerIcon="mdiMagnify"
        variant="outlined"
        @input="updateSearch"
        @click:clear="resetSearch"
      />
    </v-col>
  </v-row>
</template>

<style lang="scss">
.datepicker {
  input {
    height: 56px;
    border-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
