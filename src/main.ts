import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from '@/router'
import vuetify from './plugins/vuetify'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

const pinia = createPinia()

pinia.use(createPersistedState())

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(vue3GoogleLogin, {
  clientId: '308971374438-6g2kebmmg13ik4cedn90ekmp934ec0bf.apps.googleusercontent.com'
})

app.mount('#app')
