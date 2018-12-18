import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import Layout from 'Layout/index.js';

Vue.prototype.api = api;
Vue.config.productionTip = false

Vue.use(Layout);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
