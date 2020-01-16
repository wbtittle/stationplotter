import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/about",
    name:'about',
    component: About
  },
  {
    path: '/:station_id',
    name: 'station',
    component: Home
  }

]

const router = new VueRouter({
  routes
})

export default router
