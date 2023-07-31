import './assets/main.css'

import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import store from "@/stores/store.js";
import App from './App.ce.vue'
//import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App)

//app.use(createPinia())
app.use(store)
app.mount('#app')
