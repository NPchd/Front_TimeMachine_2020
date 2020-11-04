import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js' 
import 'vue-datetime/dist/vue-datetime.css'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
