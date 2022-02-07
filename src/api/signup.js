import API from '@/service/request'

export function signup(params) {
  return API.post('/dcexpress/login/doRegister', params)
}
