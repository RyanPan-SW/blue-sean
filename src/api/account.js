import API from '@/service/request'

export function getAccount() {
  return API.get('/account')
}
