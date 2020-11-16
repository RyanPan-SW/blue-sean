/* 对axios根据业务需求再次封装 */
import axios from 'axios'
// import { USER_TOKEN } from '@/utils/constant'

// const codeWhiteList = [2001, 2003, 3001, 4011, 4007, 5004, 4012, 4013, 4014, 4015, 4016, 4017, 4003] // 不需要弹窗的code错误码白名单
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://rap2api.taobao.org/app/mock/265092',
  baseURL: '/',
  timeout: 20000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use((response) => {
  // 拦截文件流
  const { headers } = response
  if (headers['content-type'] === 'application/octet-stream') {
    return response.data
  }

  const res = response.data
  if (res.code === 200) {
    // 响应成功
    return res.data
  }
  // 2004:  token 无效; 2005:  token 过期; 2008 token强制登出
  return Promise.reject(res)
})
/* 其他的情况 */

export default service
