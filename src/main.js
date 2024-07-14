import './assets/tailwind.css'; // Import the Tailwind CSS file
import 'element-plus/dist/index.css'
// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
    },
    {
        path: '/article',
        name: 'Article',
        component: () => import('./views/Article.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })  

const pinia = createPinia();
 
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')

router.beforeEach((to, from, next) => {
    document.title = "Dictarticle " + to.name;
    next();
  });
  