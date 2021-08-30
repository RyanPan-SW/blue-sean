import API from '@/service/request'

export function getConfigContent(params) {
  return API.get('/common/getConfigByCode', {params})
}

export function getFAQ(params) {
  return API.get('/common/getFAQ', {params})
}
