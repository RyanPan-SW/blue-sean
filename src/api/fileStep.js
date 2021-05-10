import API from '@/service/request'

export function getAllCity() {
  return API.post('/express/getAllCity')
}

export function getSearchAddress(params) {
  return API.post('/address/getAddress', params)
}
// 发件人
export function setSenderApi(params) {
  return API.post('/express/setSender', params)
}

export function getSessionSender(params) {
  return API.post('/express/getSender', params)
}
// 收件人
export function setRecipientApi(params) {
  return API.post('/express/setRecipient', params)
}

export function getSessionRecipient(params) {
  return API.post('/express/getRecipient', params)
}
