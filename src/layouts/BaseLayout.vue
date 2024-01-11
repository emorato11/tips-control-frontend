<script setup lang="ts">
import { mdiHomeAnalytics, mdiStar, mdiLogout } from '@mdi/js'
import { computed, ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import { useDisplay } from 'vuetify'

import { useAuthStore } from '@/stores'
import { RouteNames } from '@/types/Routes'
const { mobile } = useDisplay({ mobileBreakpoint: 720 })

const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(false)
const items = ref([
  { text: 'Home', icon: mdiHomeAnalytics, redirect: RouteNames.HOME },
  { text: 'Tipsters', icon: mdiStar, redirect: RouteNames.TIPSTERS }
])

const fullName = computed(() => `${authStore.user?.name} ${authStore.user?.lastName}`)

const goTo = (route: string) => {
  router.push({ name: route })
}

const logout = () => {
  authStore.logout()
  goTo('login')
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact" @click.stop="drawer = !drawer">
      <template #prepend v-if="mobile">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <div class="d-flex ga-2 align-center" :class="{ 'px-2': mobile, 'px-6': !mobile }">
        <p>{{ fullName }}</p>
        <v-img :src="authStore.user?.picture" :width="40" :height="40" aspect-ratio="16/9"></v-img>
      </div>

      <template #append v-if="!mobile">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="text-body-2"
          :prepend-icon="item.icon"
          variant="text"
          @click="goTo(item.redirect)"
        >
          {{ item.text }}
        </v-btn>

        <v-btn :prepend-icon="mdiLogout" variant="text" class="text-body-2" @click="logout">
          Logout
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="mobile" v-model="drawer" location="top" temporary>
      <v-list :lines="false" density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          @click="goTo(item.redirect)"
        >
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title> {{ item.text }}</v-list-item-title>
        </v-list-item>

        <v-list-item color="primary" @click="logout">
          <template #prepend>
            <v-icon :icon="mdiLogout" color="red"></v-icon>
          </template>

          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
