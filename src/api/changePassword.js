import API from '@/service/request'

export function updatePwd(params) {
  return API.post('/login/updatePwd', params)
}
