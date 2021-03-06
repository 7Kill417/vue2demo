import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import pagination from '@/components/pagination'  //二次封装element 分页组件

Vue.component('pagination',pagination);

Vue.use(ElementUI);
Vue.config.productionTip = false




// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
