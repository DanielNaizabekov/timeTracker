import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import { routeNames } from './router/routeNames'
import { Quasar } from 'quasar'
import { quasarOptions } from './quasarOptions'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(Quasar, quasarOptions)

app.provide('$routeNames', routeNames);

app.mount('#app')
