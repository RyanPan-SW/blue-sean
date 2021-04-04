import API from '@/service/request'

export function loginApi(params) {
  return API.post('/login', params)
}
