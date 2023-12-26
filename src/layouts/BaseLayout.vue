<script setup lang="ts">
import { ref } from 'vue'
import { mdiFolder, mdiAccountMultiple, mdiStar } from '@mdi/js'
import { useRouter, RouterView } from 'vue-router'

const router = useRouter()

const drawer = ref(false)
const items = ref([
  { text: 'Home', icon: mdiFolder, redirect: 'home' },
  { text: 'Crear Tip', icon: mdiAccountMultiple, redirect: 'create-tip' },
  { text: 'Tipsters', icon: mdiStar, redirect: 'tipsters' }
])

const goTo = (route: string) => {
  router.push(route)
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" density="compact" @click.stop="drawer = !drawer">
      <template #prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Tipster control app</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left" temporary>
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
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>
