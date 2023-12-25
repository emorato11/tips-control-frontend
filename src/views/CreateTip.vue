<script setup lang="ts">
import { ref } from 'vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { mdiDeleteOutline, mdiPlus } from '@mdi/js'
import type { Selection } from '@/types/Tip'
import { Status } from '@/types/Common'

const tipName = ref()
const date = ref()
const status = ref(Status.PENDING)
const spent = ref()
const potentialReturn = ref()
const selections = ref<Selection[]>([{ name: '', status: Status.PENDING }])

const statusOptions = ref(Object.values(Status))

// const tipNameRules = [
//   (value: string) => {
//     if (value) return true

//     return 'Requerido'
//   }
// ]

const addNewSelection = () => {
  selections.value = [...selections.value, { name: '', status: Status.PENDING }]
}
const removeSelection = (idx: number) => {
  selections.value = selections.value.filter((_, i) => i !== idx)
}
</script>

<template>
  <v-form @submit.prevent>
    <v-container>
      <span class="mb-4 text-center text-h4 w-100 d-block">Crear Tip</span>
      <v-row dense class="mb-4">
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-autocomplete
            label="Tipster"
            :rules="[(v) => !!v || 'Requerido']"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <VueDatePicker
            v-model="date"
            class="datepicker w-auto"
            :enable-time-picker="true"
            auto-apply
          />
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-text-field
            v-model="tipName"
            :rules="[(v) => !!v || 'Requerido']"
            label="Nombre del tip"
            variant="outlined"
          ></v-text-field>
        </v-col>

        <!-- <v-row dense> -->
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-select
            v-model="status"
            :items="statusOptions"
            :rules="[(v) => !!v || 'Requerido']"
            label="Status"
            variant="outlined"
            required
          />
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-text-field
            v-model="spent"
            type="number"
            hide-details
            variant="outlined"
            label="Cantidad Invertida"
            :rules="[(v) => !!v || 'Requerido']"
          />
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-text-field
            v-model="potentialReturn"
            type="number"
            hide-details
            variant="outlined"
            label="Posibles Ganancias"
            :rules="[(v) => !!v || 'Requerido']"
          />
        </v-col>
      </v-row>

      <div class="d-flex flex-column py-4">
        <span class="text-center text-h5 text-center mb-4">Selecciones</span>

        <v-row dense v-for="(selection, idx) in selections" :key="idx" class="justify-center">
          <v-col cols="5">
            <v-text-field
              v-model="selection.name"
              :rules="[(v) => !!v || 'Requerido']"
              :label="`Selección ${idx + 1}: Nombre`"
              variant="outlined"
            />
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="selection.status"
              :items="statusOptions"
              :rules="[(v) => !!v || 'Requerido']"
              :label="`Selección ${idx + 1}: Status`"
              variant="outlined"
              required
            />
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn
              class="align-self-center"
              elevation="4"
              variant="outlined"
              size="large"
              color="error"
              :icon="mdiDeleteOutline"
              @click="removeSelection(idx)"
            />
          </v-col>
        </v-row>

        <v-btn
          class="align-self-center"
          elevation="4"
          size="large"
          color="primary"
          :icon="mdiPlus"
          @click="addNewSelection"
        />
      </div>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped></style>
