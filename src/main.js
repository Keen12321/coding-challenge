import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'
import accounting from 'accounting'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-default.css'

import App from './App.vue'
import Home from './pages/Home.vue'
import Cart from './pages/Cart.vue'
import OrderConfirmation from './pages/OrderConfirmation.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueToast)

Vue.filter('currency', function(val){
  return accounting.formatMoney(val)
})

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/orderconfirmation',
      name: 'orderConfirmation',
      component: OrderConfirmation,
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
