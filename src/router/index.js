import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/orderService',
    children: [
      { //订单
        path: '/orderService',
        name: 'orderService',
        meta: {title: '订单服务'},
        component: () => import('../views/orderService')
      },
      { //基础设置
        path: '/settings',
        name: 'settings',
        meta: { title: '基础设置'},
        component: () => import('../views/settings')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
