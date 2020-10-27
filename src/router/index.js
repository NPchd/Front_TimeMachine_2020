import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceuil_Login from '../components/Acceuil_Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Acceuil_Login',
    component: Acceuil_Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/manager',
    name: 'Manager',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/Manager.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
