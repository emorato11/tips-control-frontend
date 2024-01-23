<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { mdiDeleteOutline, mdiPlus, mdiArrowLeft } from '@mdi/js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { Status } from '@/types/Common'
import type { Selection, CreateTip } from '@/types/Tip'
import { SPORTS_SELECTIONS } from '@/utils/sports'
import type { Tipster } from '@/types/Tipster'
import { useRouter } from 'vue-router'
import { RoutesName } from '@/types/Routes'

interface TipFormProps {
  isEditing?: boolean
  loading: boolean
  formValues?: CreateTip
  tipsters: Tipster[]
}

const router = useRouter()

const props = withDefaults(defineProps<TipFormProps>(), { loading: false })

const emit = defineEmits<{
  (e: 'submitForm', value: CreateTip): void
  // (e: 'updateDateType', value: DateFilterType): void
}>()

const form = ref()
const tipName = ref()
const tipster = ref()
const date = ref()
const type = ref()
const status = ref(Status.PENDING)
const spent = ref()
const potentialReturn = ref()
const selections = ref<Selection[]>([{ name: '', status: Status.PENDING }])

const statusOptions = ref(Object.values(Status))

const title = computed(() => (props.isEditing ? 'Editar Tip' : 'Crear Tip'))

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    await handleCreateTip()
  }
}

const handleCreateTip = async () => {
  const payload: CreateTip = {
    name: tipName.value,
    tipster: tipster.value,
    date: date.value,
    potentialReturn: potentialReturn.value,
    spent: spent.value,
    status: status.value,
    type: type.value,
    selections: selections.value
  }

  emit('submitForm', payload)

  resetForm()
}

const resetForm = () => {
  tipster.value = null
  tipName.value = null
  date.value = null
  type.value = null
  selections.value = [{ name: '', status: Status.PENDING }]
  spent.value = null
  potentialReturn.value = null
  status.value = Status.PENDING
}

const removeSelection = (idx: number) => {
  selections.value = selections.value.filter((_, i) => i !== idx)
}

const addNewSelection = () => {
  selections.value = [...selections.value, { name: '', status: Status.PENDING }]
}

const goBackHome = () => {
  router.push(RoutesName.HOME)
}

onMounted(() => {
  if (props.isEditing) {
    tipster.value = props.formValues?.tipster
    tipName.value = props.formValues?.name
    date.value = props.formValues?.date
    type.value = props.formValues?.type
    selections.value = props.formValues?.selections || []
    spent.value = props.formValues?.spent
    potentialReturn.value = props.formValues?.potentialReturn
    status.value = props.formValues?.status || Status.PENDING
  }
})
</script>
<template>
  <v-form @submit.prevent="handleSubmit" ref="form" class="px-2">
    <v-row dense class="my-2">
      <v-col cols="6">
        <v-btn variant="text" size="small" :prependIcon="mdiArrowLeft" @click="goBackHome">
          Volver a Home
        </v-btn>
      </v-col>
      <v-col cols="6">
        <span class="text-right text-body-1 font-weight-bold w-100 d-block title">
          {{ title }}
        </span>
      </v-col>
    </v-row>
    <v-row dense class="mb-4">
      <v-col cols="12" lg="4" md="4" sm="6">
        <v-autocomplete
          v-model="tipster"
          label="Tipster"
          :rules="[(v) => !!v || 'Requerido']"
          :items="props.tipsters"
          itemTitle="name"
          itemValue="value"
          variant="outlined"
        />
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="6">
        <VueDatePicker
          v-model="date"
          placeholder="Selecciona una fecha"
          class="datepicker w-auto"
          :enableTimePicker="true"
          timePickerInline
          autoApply
        />
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="6">
        <v-text-field
          v-model="tipName"
          :rules="[(v) => !!v || 'Requerido']"
          label="Nombre del tip"
          variant="outlined"
        />
      </v-col>

      <v-col cols="12" lg="4" md="4" sm="6">
        <v-select
          v-model="type"
          :items="SPORTS_SELECTIONS"
          :rules="[(v) => !!v || 'Requerido']"
          label="Deporte"
          variant="outlined"
          required
          itemTitle="name"
          itemValue="value"
        />
      </v-col>

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
          hideDetails
          variant="outlined"
          label="Cantidad Invertida"
          :rules="[(v) => !!v || 'Requerido']"
        />
      </v-col>
      <v-col cols="12" lg="4" md="4" sm="6">
        <v-text-field
          v-model="potentialReturn"
          type="number"
          hideDetails
          variant="outlined"
          label="Posibles Ganancias"
          :rules="[(v) => !!v || 'Requerido']"
        />
      </v-col>
    </v-row>

    <div class="d-flex flex-column pb-4">
      <span class="text-center text-h6 text-center mb-4">Selecciones</span>

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

    <v-btn
      type="submit"
      block
      class="mt-2 mb-4"
      :loading="loading"
      variant="elevated"
      color="primary"
    >
      Submit
    </v-btn>
  </v-form>
</template>

<style scoped lang="scss">
.title {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    right: -16px;
    bottom: 0;
    width: 100px;
    height: 6px;
    transform: skew(-12deg) translateX(-50%);
    background: rgb(var(--v-theme-primary));
    z-index: -1;
  }
}
</style>
