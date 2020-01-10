import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import MappedStations from '@/components/MappedStations'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: "/maps",
    name:'maps',
    component: MappedStations
  }

]

const router = new VueRouter({
  routes
})

export default router
