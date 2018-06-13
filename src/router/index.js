import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/SignIn/index'
import Home from '@/components/Home/index'
import Landing from '@/components/Landing/index'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

Vue.use(Router)

export default new Router({
    routes: [
        {
          path: '/',
          name: 'Landing',
          component: Landing
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        },
        {
            path: '/profile',
            name: 'Home',
            component: Home
        }
    ]
})
