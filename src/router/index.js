import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/curriculum',
    children: [
      {//课程质量评价 
        path: '/curriculum',
        name: 'curriculum',
        meta: {title: '课程质量评价'},
        component: () => import('../views/reachDegree/curriculum')
      },
      {//指标达成度 
        path: '/targetEvaluate',
        name: 'targetEvaluate',
        meta: {title: '指标达成度'},
        component: () => import('../views/reachDegree/targetEvaluate')
      },
      {//毕业要求达成度 
        path: '/graduation',
        name: 'graduation',
        meta: {title: '毕业要求达成度'},
        component: () => import('../views/reachDegree/graduation')
      },
      // { //订单
      //   path: '/orderService',
      //   name: 'orderService',
      //   meta: {title: '课程质量评价'},
      //   component: () => import('../views/orderService')
      // },
      // { //基础设置
      //   path: '/settings',
      //   name: 'settings',
      //   meta: { title: '基础设置'},
      //   component: () => import('../views/settings')
      // }
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
