<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mdiArrowLeft } from '@mdi/js'

import { usePaymentsStore } from '@/stores/payments'
import { PAYMENTS_TYPES } from '@/utils/payments'
import { useRoute } from 'vue-router'
import { useTipstersStore } from '@/stores'
import type { Tipster } from '@/types/Tipster'
import { useYieldStore } from '@/stores/yield'

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
// const search = ref()

const loading = computed(() => paymentsStore.loading)
const recentPayments = computed(() => paymentsStore.recentPayments)
const tipsters = computed(() => tipstersStore.tipsters)
// const yield = computed(() => yieldStore.selectedYield)

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

onMounted(async () => {
  const tipsterId = route.params.id as string
  if (!tipsters.value.length) {
    await tipstersStore.getAllTipsters()
  }
  selectedTipster.value = tipsters.value?.find((tipster) => tipster.id === tipsterId) || null

  await paymentsStore.getAllPaymentsByTipster(tipsterId)

  await yieldStore.getYieldByTipster(tipsterId)
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
        Rentabilidad
        <!-- <v-data-iterator
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
        </v-data-iterator> -->
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

        <v-card class="pa-4 mt-4" elevation="2">
          <v-card-title>Últimos Pagos</v-card-title>
          <v-list>
            <v-list-item v-for="payment in recentPayments" :key="payment.id">
              <v-list-item-title>
                {{ payment.name }} - {{ payment.spent }}€ ({{ payment.typeName }})
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style lang="scss" scoped></style>
