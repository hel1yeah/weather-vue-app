import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './assets/scss/main.scss'

Vue.config.productionTip = false

import helpers from '@/plagins/helpers'

Vue.use(helpers)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
