import API from '@/service/request'

export function createCorporate(params) {
  return API.post('/dcexpress/login/companyApply', params)
}
