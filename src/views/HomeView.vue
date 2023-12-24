<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import {
  mdiBasketball,
  mdiTennisBall,
  mdiSoccer,
  mdiAmpersand,
  mdiBell,
  mdiArrowLeft,
  mdiArrowRight
} from '@mdi/js'

import { useCounterStore } from '@/stores/counter'
import { getParsedDate } from '@/utils/date'
import { parseNumberToCurrency } from '@/utils/currency'
import { Status } from '@/types/Common'

// Mover a types
enum SPORTS_COLORS {
  basketball = '#6EC1E4',
  tennis = '#F4A261',
  football = '#6D4C41',
  multi = '#FFADAD',
  default = '#eeee'
}

const counterStore = useCounterStore()
const { getAllTips } = counterStore
const date = ref(new Date())
const tips = computed(() => {
  const newTips = counterStore.tips?.map((tip) => {
    return {
      ...tip,
      ...getSportAssets(tip.type),
      date: getParsedDate(tip.date),
      potentialReturn: parseNumberToCurrency(tip.potentialReturn),
      spent: parseNumberToCurrency(tip.spent)
    }
  })

  return newTips
})

// Mover a utils
const getSportAssets = (sport: string) => {
  if (sport === 'basketball') {
    return { icon: mdiBasketball, color: SPORTS_COLORS.basketball }
  }
  if (sport === 'tennis') {
    return { icon: mdiTennisBall, color: SPORTS_COLORS.tennis }
  }
  if (sport === 'football') {
    return { icon: mdiSoccer, color: SPORTS_COLORS.football }
  }
  if (sport === 'multi') {
    return { icon: mdiAmpersand, color: SPORTS_COLORS.multi }
  }

  return { icon: mdiBell, color: SPORTS_COLORS.default }
}

const getStatusColor = (status: Status) => {
  if (status === Status.PENDING) return 'orange'
  if (status === Status.FAILED) return 'error'
  return 'success'
}
const dateFilterOptions = ref([
  { state: 'Día concreto', value: 'single' },
  { state: 'Semana', value: 'week' },
  { state: 'Mes', value: 'month' },
  { state: 'Personalizado', value: 'range' }
])
const search = ref('')
// const desserts = ref([
//   {
//     name: 'Frozen Yogurt',
//     description:
//       'A tangy and creamy dessert made from yogurt and sometimes fruit, Frozen Yogurt is a lighter alternative to ice cream. Perfect for those who crave a sweet treat but want to keep it on the healthier side.',
//     icon: mdiBasketball,
//     color: '#6EC1E4',
//     calories: 159,
//     fat: 6,
//     carbs: 24,
//     protein: 4,
//     sodium: 87,
//     calcium: '14%',
//     iron: '1%'
//   },
//   {
//     name: 'Ice cream sandwich',
//     description:
//       "A classic treat featuring a layer of creamy ice cream sandwiched between two cookies or cake layers. Ideal for those hot summer days when you can't decide between a cookie and ice cream.",
//     icon: mdiTennisBall,
//     color: '#F4A261',
//     calories: 237,
//     fat: 9,
//     carbs: 37,
//     protein: 4.3,
//     sodium: 129,
//     calcium: '8%',
//     iron: '1%'
//   },
//   {
//     name: 'Eclair',
//     description:
//       'A small, individual cake topped with frosting and often adorned with sprinkles or other decorations. Great for parties or as a quick indulgence when you need a sugar fix.',
//     icon: mdiSoccer,
//     color: '#6D4C41',
//     calories: 262,
//     fat: 16,
//     carbs: 23,
//     protein: 6,
//     sodium: 337,
//     calcium: '6%',
//     iron: '7%'
//   },
//   {
//     name: 'Cupcake',
//     description:
//       'A small, individual cake topped with frosting and often adorned with sprinkles or other decorations. Great for parties or as a quick indulgence when you need a sugar fix.',
//     color: '#FFADAD',
//     icon: mdiAmpersand,
//     calories: 305,
//     fat: 3.7,
//     carbs: 67,
//     protein: 4.3,
//     sodium: 413,
//     calcium: '3%',
//     iron: '8%'
//   }
// ])

onMounted(async () => {
  await getAllTips()
})
</script>
<template>
  <v-container class="mb-6">
    <v-data-iterator :items="tips" item-value="name" :items-per-page="6" :search="search">
      <template #header>
        <div class="d-flex flex-md-row flex-column ga-2">
          <v-select
            class="flex-fill"
            label="Filtro de fecha"
            :items="dateFilterOptions"
            item-title="state"
            item-value="value"
            variant="outlined"
          >
          </v-select>

          <VueDatePicker
            v-model="date"
            class="datepicker w-auto"
            :enable-time-picker="false"
            auto-apply
          />

          <v-select
            class="flex-fill"
            label="Filtro de Tipster"
            :items="['Tipster Apuesta', 'BetInsider']"
            item-title="state"
            item-value="value"
            variant="outlined"
          >
          </v-select>
        </div>
      </template>

      <template #default="{ items, isExpanded, toggleExpand }">
        <v-container class="pa-2" fluid>
          <v-row dense class="pa-1 font-weight-bold"> Aqui se muestra el balance </v-row>

          <v-row dense>
            <v-col v-for="item in items" :key="item.raw.title" cols="auto" lg="3" md="4" sm="6">
              <v-card border flat>
                <v-card-title class="d-flex align-center justify-start">
                  <v-icon :color="item.raw.color" :icon="item.raw.icon" start size="18"></v-icon>

                  <span class="font-weight-bold">{{ item.raw.name }}</span>

                  <span class="ml-auto text-body-1">{{ item.raw.date }}</span>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-chip color="primary" variant="tonal"> {{ item.raw.tipster }} </v-chip>
                    <v-chip :color="getStatusColor(item.raw.status)" variant="tonal">
                      {{ item.raw.status }}
                    </v-chip>
                  </div>

                  <div class="d-flex flex-column py-4">
                    <p class="text-body-2 font-weight-500">
                      Invertido:
                      <span class="text-body-1 font-weight-bold">{{ item.raw.spent }}</span>
                    </p>
                    <p class="text-body-2 font-weight-500">
                      Posibles ganancias:
                      <span class="text-body-1 font-weight-bold">{{
                        item.raw.potentialReturn
                      }}</span>
                    </p>
                  </div>
                </v-card-text>

                <div class="px-4">
                  <v-switch
                    :model-value="isExpanded(item.raw)"
                    :label="`${isExpanded(item.raw) ? 'Ocultar' : 'Mostrar'} selecciones`"
                    density="compact"
                    inset
                    @click="() => toggleExpand(item.raw)"
                  ></v-switch>
                </div>

                <v-divider></v-divider>

                <v-expand-transition>
                  <div v-if="isExpanded(item.raw)">
                    <v-list density="compact">
                      <v-list-item v-for="selection in item.raw.selections" :key="selection.id">
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-body-2 font-weight-bold">{{ selection.name }}</span>
                          <v-chip :color="getStatusColor(selection.status)" variant="tonal">
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
          ></v-btn>

          <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

          <v-btn
            :disabled="page >= pageCount"
            :icon="mdiArrowRight"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
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
