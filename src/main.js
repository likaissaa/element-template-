/*
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-12-16
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import './plugins/iconfont.css'
import './plugins/element'
import './plugins/np'

import './assets/scss/reset.scss'
import './plugins/extendComponents'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
