import axios from 'axios'
// import qs from 'qs'
import { getCookie /* setCookie */ } from '@/helper/env'

axios.defaults.baseURL = 'http://localhost:8081'
// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = setCookie('token')
//   console.log('config', config)
//   return config
// })

axios.interceptors.response.use((config) => {
  console.log('config22', config)
  config.headers.Authorization = getCookie()
  return config
})

const http = { post: '', get: '', put: '', del: '' }

http.post = function (api, data) {
  // let params = qs.stringify(data)
  return new Promise((resolve, reject) => {
    axios.post(api, data).then((response) => {
      resolve(response)
    })
  })
}

http.get = function (api, data) {
  return new Promise((resolve, response) => {
    axios.get(api, data).then((response) => {
      resolve(response)
    })
  })
}

http.delete = function (api, data) {
  return new Promise((resolve, response) => {
    axios.delete(api, data).then((response) => {
      resolve(response)
    })
  })
}

http.put = function (api, data) {
  return new Promise((resolve, response) => {
    axios.put(api, data).then((response) => {
      resolve(response)
    })
  })
}

export default http
