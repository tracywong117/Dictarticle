import 'element-plus/dist/index.css'
import './assets/tailwind.css'; // Import the Tailwind CSS file
// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();
 
const app = createApp(App)
app.use(pinia)
app.mount('#app')
