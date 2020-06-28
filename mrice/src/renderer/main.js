import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入
import Bmob from 'hydrogen-js-sdk'

Vue.config.productionTip = false


// 初始化
Bmob.initialize('959721d37fed55ac', '123097')
Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.bmob = Vue.prototype.$bmob = Bmob
// If not already defined...
const { remote } = require('electron')
const path = require('path')
let execPath = path.dirname(remote.process.execPath)
Vue.prototype.$execPath = execPath
// electron-store
const EStore = require('electron-store')
const eStore = new EStore()
Vue.prototype.$eStore = eStore



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
