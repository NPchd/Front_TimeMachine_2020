import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Accueil_Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
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
  },
  {
    path: '/workingtimes/:userId' , 
    name: 'workingtimes',
    component: () => import('../components/WorkingTimes.vue')
  },

  {
   path: '/clocks/:userId' ,
   name: 'clock',
   component: () => import ('../components/Clock.vue')
  },

  {
   path: '/dashboard/:userId' ,
   name: 'dashboard',
   component: () => import ('../components/DashBoard.vue')
   },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
