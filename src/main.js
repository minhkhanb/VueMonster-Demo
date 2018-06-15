// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'


import VueMaterial from 'vue-material'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import 'bootstrap/dist/css/bootstrap.css'

import '../config/fa.config'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueAxios from 'vue-axios'

import axios from 'axios'

import store from './store'

Vue.use(VueAxios, axios)

Vue.use(VueMaterial);
Vue.use(Vuex)

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
