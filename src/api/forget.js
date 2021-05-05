import API from '@/service/request'

export function sendEmail(params) {
  return API.post('/sendEmail')
}

export function verificationCode(params) {
  return API.post('/login/forgetPwd', params)
}
