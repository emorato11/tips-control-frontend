<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

import { useTipstersStore } from '@/stores/tipsters'
import type { CreateTipster } from '@/types/Tipster'

import { SPORTS_SELECTIONS } from '@/utils/sports'

const tipstersStore = useTipstersStore()

const { getAllTipsters, createTipster } = tipstersStore
const form = ref()

const tab = ref()
const search = ref()

const name = ref()
const type = ref()
const description = ref()

const parsedTipsters = computed(() => tipstersStore.parsedTipsters)
const loading = computed(() => tipstersStore.loading)

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    console.log('sigo')
    await handleCreateTipster()
  }
}

const handleCreateTipster = async () => {
  const payload: CreateTipster = {
    name: name.value,
    type: type.value,
    description: description.value
  }

  await createTipster(payload)

  resetForm()
}

const resetForm = () => {
  name.value = null
  type.value = null
  description.value = null
}

onMounted(async () => {
  await getAllTipsters()
})
</script>

<template>
  <v-container>
    <v-tabs v-model="tab" fixed-tabs bg-color="primary">
      <v-tab value="list">Tipsters</v-tab>
      <v-tab value="create">Añadir Tipster</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="list">
        <v-data-iterator
          :items="parsedTipsters"
          item-value="name"
          :items-per-page="6"
          :search="search"
        >
          <!-- <template #header>
            <HomeFilters
              @update-filters="handleUpdateFilters"
              @update-date-type="updateDateFilterType"
            />
          </template> -->

          <template #default="{ items }">
            <v-container class="px-0" fluid>
              <v-row dense>
                <v-col
                  v-for="item in items"
                  :key="item.raw.id"
                  cols="auto"
                  lg="3"
                  md="4"
                  sm="6"
                  class="w-100"
                >
                  <v-card border flat>
                    <v-card-title class="d-flex justify-center">
                      <v-row>
                        <v-col cols="8">
                          <span class="font-weight-bold">
                            {{ item.raw.name }}
                          </span>
                        </v-col>
                        <v-col cols="4" class="d-flex ga-2 align-center justify-end">
                          <span class="text-body-2 text-capitalize">{{ item.raw.type }}</span>
                          <v-icon :color="item.raw.color" :icon="item.raw.icon" start size="18" />
                        </v-col>
                      </v-row>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text>
                      <span class="font-weight-500">{{ item.raw.description }}</span>
                    </v-card-text>
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
      </v-window-item>

      <v-window-item value="create">
        <v-form @submit.prevent="handleSubmit" ref="form">
          <v-container>
            <v-row dense>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-text-field
                  v-model="name"
                  :rules="[(v) => !!v || 'Requerido']"
                  label="Nombre"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" lg="6" md="6" sm="6">
                <v-select
                  v-model="type"
                  :items="SPORTS_SELECTIONS"
                  :rules="[(v) => !!v || 'Requerido']"
                  label="Deporte"
                  variant="outlined"
                  required
                  item-title="name"
                  item-value="value"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Descripcion"
                  auto-grow
                  variant="outlined"
                  rows="1"
                  row-height="15"
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

<style lang="scss" scoped></style>
