<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CreateGroup } from '@/types/Group'
import type { Tipster } from '@/types/Tipster'

interface GroupFormProps {
  isEditing?: boolean
  loading: boolean
  formValues?: CreateGroup
  tipsters: Tipster[]
}
const props = withDefaults(defineProps<GroupFormProps>(), { loading: false })

const emit = defineEmits<{
  (e: 'submitForm', value: CreateGroup): void
  // (e: 'updateDateType', value: DateFilterType): void
}>()

const form = ref()

const name = ref()
const tipsterName = ref()
const tipsterId = ref()

const handleSubmit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    handleCreateGroup()
  }
}

const handleCreateGroup = () => {
  const payload: CreateGroup = {
    name: name.value,
    tipsterId: tipsterId.value,
    tipsterName: tipsterName.value
  }

  emit('submitForm', payload)

  resetForm()
}

const resetForm = () => {
  name.value = null
  tipsterId.value = null
  tipsterName.value = null
}

const selectTipster = () => {
  tipsterName.value = props.tipsters.find((tipster) => tipster.id === tipsterId.value)?.name
}

onMounted(() => {
  if (props.isEditing) {
    name.value = props.formValues?.name
    tipsterId.value = props.formValues?.tipsterId
    tipsterName.value = props.formValues?.tipsterName
  }
})
</script>
<template>
  <v-form @submit.prevent="handleSubmit" ref="form">
    <v-container>
      <v-row dense class="mb-4">
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-autocomplete
            v-model="tipsterId"
            label="Tipster"
            :rules="[(v) => !!v || 'Requerido']"
            :items="props.tipsters"
            itemTitle="name"
            itemValue="id"
            variant="outlined"
            @update:modelValue="selectTipster"
          />
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="6">
          <v-text-field
            v-model="name"
            :rules="[(v) => !!v || 'Requerido']"
            label="Nombre"
            variant="outlined"
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
