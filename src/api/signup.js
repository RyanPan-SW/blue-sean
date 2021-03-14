import API from '@/service/request'

export function signup(params) {
  return API.post('/signup', params)
}
