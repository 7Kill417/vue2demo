/**
 * 传统方式
 */
import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { basicUrl } from './config'

const request = axios.create({
    baseURL: basicUrl,
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
export default request