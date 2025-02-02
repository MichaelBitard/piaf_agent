import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Answers from '../views/Answers.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Answers',
    name: 'Answers',
    component: Answers
  },
  {
    path: '/Error',
    name: 'Error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
  },
  {
    path: '*',
    name: 'catchAll',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH
})

export default router
