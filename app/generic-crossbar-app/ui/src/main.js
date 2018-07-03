import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import 'buefy/lib/buefy.css'
import 'font-awesome5/css/fontawesome-all.css'
import store from './store'
import xbr_interface from '../assets/js/xbr_interface.js'

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultContainerElement: '#app'
})

window.$vue = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

window.$vue.$xbr_interface = new xbr_interface.Interface(window.$vue)

setTimeout(function () {
  window.$vue.$xbr_interface.connect()
},3000)
