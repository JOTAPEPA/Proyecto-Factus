import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {Quasar} from 'quasar'
<<<<<<< HEAD
import { router } from "./routes/routes.js";
=======
import {router} from './routes/routes.js'
>>>>>>> 883e1ed352f387d44fce60f83e4a2082972e8d09
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