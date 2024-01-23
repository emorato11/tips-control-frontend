<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { mdiArrowLeft, mdiArrowRight, mdiDeleteOutline, mdiLeadPencil } from '@mdi/js'

import TipsterForm from '@/components/TipsterForm.vue'

import { useTipstersStore } from '@/stores/tipsters'
import type { CreateTipster } from '@/types/Tipster'
import { useRouter } from 'vue-router'
import { RouteNames } from '@/types/Routes'

const tipstersStore = useTipstersStore()
const router = useRouter()

const { getAllTipsters, createTipster, deleteTipster, selectTipster } = tipstersStore

const tab = ref()
const search = ref()

const parsedTipsters = computed(() => tipstersStore.parsedTipsters)
const loading = computed(() => tipstersStore.loading)

const handleCreateTipster = async (payload: CreateTipster) => {
  await createTipster(payload)
}

const removeTipster = async (id: string) => {
  await deleteTipster(id)
}
const updateTipster = async (id: string) => {
  selectTipster(id)

  router.push({ name: RouteNames.TIPSTER_DETAILS, params: { id } })
}

onMounted(async () => {
  await getAllTipsters()
})
</script>

<template>
  <v-container>
    <v-tabs v-model="tab" fixedTabs bgColor="primary">
      <v-tab value="list">Tipsters</v-tab>
      <v-tab value="create">Añadir Tipster</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="list">
        <v-data-iterator
          :items="parsedTipsters"
          itemValue="name"
          :itemsPerPage="6"
          :search="search"
        >
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

                    <v-divider />

                    <v-card-text class="d-flex justify-space-between align-center">
                      <span class="font-weight-500">{{ item.raw.description }}</span>
                      <div class="d-flex ga-2">
                        <v-btn
                          class="align-self-center"
                          elevation="4"
                          variant="outlined"
                          size="small"
                          color="orange"
                          :icon="mdiLeadPencil"
                          @click="updateTipster(item.raw.id)"
                        />

                        <v-btn
                          class="align-self-center"
                          elevation="4"
                          variant="outlined"
                          size="small"
                          color="error"
                          :icon="mdiDeleteOutline"
                          @click="removeTipster(item.raw.id)"
                        />
                      </div>
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
      </v-window-item>

      <v-window-item value="create">
        <TipsterForm :loading="loading" @submitForm="handleCreateTipster" />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style lang="scss" scoped></style>
