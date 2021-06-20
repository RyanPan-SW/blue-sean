import axios from 'axios'
import { API_HOST } from '@/config'
import { clearAllCookie, getCookie } from '@/helper/env'
import { message } from 'antd'

// const codeWhiteList = [2001, 2003, 3001, 4011, 4007, 5004, 4012, 4013, 4014, 4015, 4016, 4017, 4003] // 不需要弹窗的code错误码白名单
// 创建axios实例
const API = axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  baseURL: API_HOST,
  timeout: 20000,
})

// 请求拦截器
API.interceptors.request.use((config) => {
  if (getCookie('token')) {
    config.headers.authorization = getCookie('token')
  }
  const sessionid = localStorage.getItem('sessionid')
  if (sessionid) {
    config.headers.sessionid = sessionid
  }
  return config
})

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  },
)

// // 响应拦截器
API.interceptors.response.use((response) => {
  const { code, errmsg, data } = response
  if (code === '200') {
    if (data.msg) {
      message.success(data.msg)
    }
    return response
  }
  if (code !== 200) {
    if (code === 'LO007' || code === 'LO008') {
      clearAllCookie()
      localStorage.clear()
      window.location.href = '/login'
      message.error(errmsg)
      return response
    } else if (errmsg) {
      message.error(errmsg)
      return response
    } else {
      return response
    }
  }
  //   // 拦截文件流
  //   const { headers } = response
  //   if (headers['content-type'] === 'application/octet-stream') {
  //     return response.data
  //   }
  //   const res = response.data
  //   if (res.code === 200) {
  //     // 响应成功
  //     return res.data
  //   }
  //   // 2004:  token 无效; 2005:  token 过期; 2008 token强制登出
  //   return Promise.reject(res)
})

export default API
