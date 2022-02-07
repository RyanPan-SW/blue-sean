import API from '@/service/request'

export function getAsk(params) {
  return API.post('/dcexpress/feedback/subFeedback', params)
}
