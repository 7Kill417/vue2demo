import Vue from 'vue'

export const basicUrl = process.env.VUE_APP_API
export const cookieId = process.env.VUE_APP_cookieId

Vue.prototype.$basicUrl = basicUrl

