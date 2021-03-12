import API from '@/service/request'

export function getAsk(params) {
  return API.get('/askQuestion')
}
