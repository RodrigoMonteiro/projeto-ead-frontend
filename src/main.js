import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './config/store.js'
import './config/bootstrap'
import router from './config/router'
import './config/msgs'
import './config/aaxios'
import './config/mq'


Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
