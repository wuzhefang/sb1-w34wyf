import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './index.css'

// Import views
import Home from './views/Home.vue'
import Customers from './views/Customers.vue'
import Orders from './views/Orders.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/features',
      name: 'features',
      component: () => import('./views/Features.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    }
  ]
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')