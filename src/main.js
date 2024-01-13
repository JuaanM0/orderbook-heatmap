import Vue from 'vue'
import App from './App.vue'
import {router} from './router.js'
import './assets/main.css'

new Vue({
  render: (h) => h(App),
  router
}).$mount('#app')
