import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.use(Vant)
Vue.use(moment)
Vue.config.productionTip = false

Vue.filter('dataFormat', function (data) {
  return moment(data).format('YYYY-MM-DD')
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
