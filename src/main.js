import Vue from 'vue'
import Vuex from 'vuex'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(VueCompositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
