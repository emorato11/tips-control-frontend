<script setup lang="ts"></script>

<template>
  <v-form @submit.prevent>
    <v-container>
      <v-autocomplete
        label="Tipster"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        variant="underlined"
      />
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped></style>
