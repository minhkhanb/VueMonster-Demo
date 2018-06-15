import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn/index'
import Home from '@/components/Home/index'
import BootstrapVue from 'bootstrap-vue'
import store from '../store'
Vue.use(BootstrapVue);

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/profile')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'SignIn',
            component: SignIn,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/profile',
            name: 'Home',
            component: Home,
            beforeEnter: ifAuthenticated
        }
    ]
})
