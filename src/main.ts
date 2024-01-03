import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/router'
import vuetify from './plugins/vuetify'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(vue3GoogleLogin, {
  clientId: '308971374438-6g2kebmmg13ik4cedn90ekmp934ec0bf.apps.googleusercontent.com'
})

app.mount('#app')
