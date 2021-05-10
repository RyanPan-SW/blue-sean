import API from '@/service/request'

export function getAllCity() {
  return API.post('/express/getAllCity')
}
