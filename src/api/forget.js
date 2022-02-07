import API from '@/service/request'

export function getCode(params) {
  return API.post('/dcexpress/login/forgetPwd', params)
}

export function verificationCode(params) {
  return API.post('/dcexpress/login/checkCode', params)
}

export function updatePwdByCode(params) {
  return API.post('/dcexpress/login/updatePwdByCode', params)
}
