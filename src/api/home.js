import API from '@/service/request'

export function getAsk(params) {
  return API.post('/feedback/subFeedback', params)
}
