import API from '@/service/request'

export function createCorporate(params) {
  return API.post('/login/companyApply', params)
}