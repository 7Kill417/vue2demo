//import request from './http'
import {post} from './http2'

export const getMenuList = (data) => post('/vue2demo/test', data)
