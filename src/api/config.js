import Vue from 'vue'
import axios from 'axios'


export const basicUrl = process.env.VUE_APP_API
export const cookieId = process.env.VUE_APP_cookieId

Vue.prototype.$basicUrl = basicUrl

