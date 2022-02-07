import API from '@/service/request'

export function getConfigContent(params) {
  return API.get('/dcexpress/common/getConfigByCode', {params})
}

export function getFAQ(params) {
  return API.get('/dcexpress/common/getFAQ', {params})
}
