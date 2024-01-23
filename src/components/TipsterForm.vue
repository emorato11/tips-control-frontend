<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CreateTipster } from '@/types/Tipster'
import { SPORTS_SELECTIONS } from '@/utils/sports'

interface TipsterFormProps {
  isEditing?: boolean
  loading: boolean
  formValues?: CreateTipster
}
const props = withDefaults(defineProps<TipsterFormProps>(), { loading: false })

const emit = defineEmits<{
  (e: 'submitForm', value: CreateTipster): void
  // (e: 'updateDateType', value: DateFilterType): void
}>()

const form = ref()

const name = ref()
const type = ref()
const description = ref()

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    handleCreateTipster()
  }
}

const handleCreateTipster = () => {
  const payload: CreateTipster = {
    name: name.value,
    type: type.value,
    description: description.value
  }

  emit('submitForm', payload)

  resetForm()
}

const resetForm = () => {
  name.value = null
  type.value = null
  description.value = null
}

onMounted(() => {
  if (props.isEditing) {
    name.value = props.formValues?.name
    type.value = props.formValues?.type
    description.value = props.formValues?.description
  }
})
</script>
<template>
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
            itemTitle="name"
            itemValue="value"
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            label="Descripcion"
            autoGrow
            variant="outlined"
            rows="1"
            rowHeight="15"
          />
        </v-col>
      </v-row>

      <v-btn
        type="submit"
        block
        class="mt-2"
        :loading="props.loading"
        variant="elevated"
        color="primary"
      >
        Submit
      </v-btn>
    </v-container>
  </v-form>
</template>

<style scoped></style>
