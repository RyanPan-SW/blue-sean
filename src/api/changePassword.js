import API from '@/service/request'

export function updatePwd(params) {
  return API.post('/dcexpress/login/updatePwd', params)
}
