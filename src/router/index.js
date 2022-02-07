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
      {//课程达成度 
        path: '/curriculum',
        name: 'curriculum',
        meta: {title: '课程达成度'},
        component: () => import('../views/reachDegree/curriculum')
      },
      {//课程达成度(详情)
        path: '/stuDetails',
        name: 'stuDetails',
        meta: {title: '课程达成度详情'},
        component: () => import('../views/reachDegree/curriculum/details/stuDetails')
      },
      {//指标点评价 
        path: '/targetEvaluate',
        name: 'targetEvaluate',
        meta: {title: '指标点评价'},
        component: () => import('../views/reachDegree/targetEvaluate')
      },
      {//指标点评价 详情
        path: '/targetEvaluateDetails',
        name: 'targetEvaluateDetails',
        meta: {title: '指标点评价'},
        component: () => import('../views/reachDegree/targetEvaluate/details/stuDetails')
      },
      {//毕业要求达成度 
        path: '/graduation',
        name: 'graduation',
        meta: {title: '毕业要求达成度'},
        component: () => import('../views/reachDegree/graduation')
      },
      {
        path: '/graduationDetails',
        name: 'graduationDetails',
        meta: {title: '指标点评价'},
        component: () => import('../views/reachDegree/graduation/details')
      },
      {
        path:'/stuNoList',
        name:'stuNoList',
        meta: {title: '毕业要求达成度学生列表'},
        component: () => import('../views/reachDegree/graduation/stuNoList')
      },
      {//课程信息管理
        path:'/CourseInformation',
        name:'CourseInformation',
        meta: {title: '成课程信息管理'},
        component: () => import('../views/reachDegree/Course_information')
      }
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title+'-欢迎访问达成度评价系统'
  }
  next()
})

export default router
