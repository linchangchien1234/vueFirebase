//載入框架
import Vue from 'vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/jquery/dist/jquery.js'

//ajax axios方法載入
import Vueaxios from 'vue-axios'
import axios from 'axios'
Vue.use(Vueaxios, axios)

//vuex
import { store } from './store/store'
import App from './App.vue'

//router
import VueRouter from 'vue-router'
import Router from './router/router.js'
Vue.use(VueRouter);

const router = new VueRouter({
	routes:Router,
	mode:'history'
});

new Vue({
  el: '#app',
  router:router,
  store:store,
  render: h => h(App)
})
