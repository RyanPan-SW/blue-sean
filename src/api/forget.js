import API from '@/service/request'

export function getCode(params) {
  return API.post('/login/forgetPwd', params)
}

export function verificationCode(params) {
  return API.post('/login/checkCode', params)
}

export function updatePwd(params) {
  return API.post('/login/updatePwdByCode', params)
}
