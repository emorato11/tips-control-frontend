<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { RoutesName } from '@/types/Routes'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const callback = async (response: Record<string, string>) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup

  authStore.setUserToken(response.credential)
  await authStore.handleLogin()

  router.push({ name: RoutesName.HOME })
}
</script>
<template>
  <v-container class="d-flex justify-center align-center">
    <!-- <v-btn variant="elevated" color="primary" @click="handleLogin"> Login </v-btn> -->
    <GoogleLogin :callback="callback" prompt />
  </v-container>
</template>

<style scoped></style>
