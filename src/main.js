import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {Quasar} from 'quasar'
import { router } from "./routes/routes.js";
// import piniaPluguinPersistedState from 'pinia/plugin-persistedstate'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'


import App from './App.vue'

const pinia = createPinia()
const myApp = createApp(App)



myApp.use(Quasar, {
    plugins: {},  
})
myApp.use(router)

myApp.use(pinia)
myApp.mount('#app')
//pinia.use(piniaPluguinPersistedState)