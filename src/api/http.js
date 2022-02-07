/**
 * 传统方式
 */
import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { basicUrl } from './config'
import Vue from 'vue'



//axios.defaults.baseURL = '/api'  //关键代码
axios.defaults.baseURL = basicUrl  //关键代码

//自定义表单提交
Vue.prototype.$upload = axios.create({
    timeout: 120000, 
    headers: {
        'Content-Type': 'multipart/form-data' //请求头
    }
}) 



//request请求
const request = axios.create({
    //baseURL: '/api',
    timeout: 1000000,
    method: 'POST',
})

//请求拦截器  需要的时候再用
request.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    const res = response.data
    return res
})





export {
    request
}

