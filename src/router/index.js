import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../components/SignUp.vue')
  },
  {
   path: '/user' ,
   name: 'user',
   component: () => import ('../components/User.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
