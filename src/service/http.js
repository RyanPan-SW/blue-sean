import axios from 'axios'
import { COR_API_HOST } from '@/config'
import { /* clearAllCookie, */ getCookie } from '@/helper/env'

// 创建axios实例
const http = axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  baseURL: COR_API_HOST,
  timeout: 20000,
})

// 请求拦截器
http.interceptors.request.use((config) => {
  if (getCookie('token')) {
    config.headers.authorization = getCookie('token')
  }
  const sessionid = localStorage.getItem('sessionid')
  if (sessionid) {
    config.headers.sessionid = sessionid
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // 请求已发出，服务器返回的 http 状态码不是 2xx，例如：400，500，
      console.info(error.response)
    } else if (error.request) {
      // 请求已发出，但没有收到响应，例如：断网
      console.info(error.request)
    } else {
      // 请求被取消或者发送请求时异常
      console.info(error.message)
    }
    return Promise.reject(error)
  },
)

export default http
