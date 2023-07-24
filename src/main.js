import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@coreui/coreui/dist/css/coreui.min.css'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')
