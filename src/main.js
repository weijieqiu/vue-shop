import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';

import router from './router'
import axios from 'axios'

// 导入全局样式表
import './assets/css/global.css'

import './plugins/element.js'


Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8888/'
axios.interceptors.request.use(config =>{
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  config.headers.common['token'] = window.sessionStorage.getItem('token')
  // console.log(sessionStorage.getItem('token'))
  return config;
},error => {
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
