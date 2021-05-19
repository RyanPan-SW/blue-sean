import API from '@/service/request'

export function getConfigContent(params) {
  return API.post('/common/getConfigByCode', params)
}
