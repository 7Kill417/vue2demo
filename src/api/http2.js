/**
 * Promise 回调地狱
 */
import axios from 'axios'
import { basicUrl } from './config'


const request = axios.create({
    baseURL: basicUrl,
    timeout: 1000000,
    method: 'POST',
})
request.interceptors.request.use(config => {
    
    return config
}, error => {
    return Promise.reject(error)
})
export function post(url, params) {
    return new Promise((resolve, reject) => {
        request.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}