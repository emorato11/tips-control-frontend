<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

import HomeFilters from '@/components/HomeFilters.vue'
import { useTipsStore } from '@/stores/tips'
import { Status } from '@/types/Common'

const tipsStore = useTipsStore()
const { getAllTips } = tipsStore

const getStatusColor = (status: Status) => {
  if (status === Status.PENDING) return 'orange'
  if (status === Status.FAILED) return 'error'
  return 'success'
}
const search = ref('')

onMounted(async () => {
  await getAllTips()
})
</script>
<template>
  <v-container class="mb-6">
    <v-data-iterator
      :items="tipsStore.parsedTips"
      item-value="name"
      :items-per-page="6"
      :search="search"
    >
      <template #header>
        <HomeFilters />
      </template>

      <template #default="{ items, isExpanded, toggleExpand }">
        <v-container class="pa-2" fluid>
          <v-row dense class="pa-1 font-weight-bold"> Aqui se muestra el balance </v-row>

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
              <v-card border flat>
                <v-card-title class="d-flex align-center justify-start ga-1">
                  <v-icon :color="item.raw.color" :icon="item.raw.icon" start size="18"></v-icon>

                  <span class="font-weight-bold text-center text-truncate">{{
                    item.raw.name
                  }}</span>

                  <span class="ml-auto text-body-2 font-weight-thin">{{ item.raw.date }}</span>
                </v-card-title>

                <v-divider></v-divider>

                <v-card-text>
                  <div class="d-flex justify-space-between">
                    <v-chip color="primary" variant="tonal"> {{ item.raw.tipster }} </v-chip>
                    <v-chip
                      :color="getStatusColor(item.raw.status)"
                      variant="tonal"
                      class="text-capitalize"
                    >
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
                    :model-value="isExpanded(item as any)"
                    :label="`${isExpanded(item as any) ? 'Ocultar' : 'Mostrar'} selecciones`"
                    density="compact"
                    inset
                    @click="() => toggleExpand(item as any)"
                  ></v-switch>
                </div>

                <v-divider></v-divider>

                <v-expand-transition>
                  <div v-if="isExpanded(item as any)">
                    <v-list density="compact">
                      <v-list-item v-for="selection in item.raw.selections" :key="selection.id">
                        <div class="d-flex justify-space-between align-center">
                          <span class="text-body-2 font-weight-bold">{{ selection.name }}</span>
                          <v-chip
                            :color="getStatusColor(selection.status)"
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
