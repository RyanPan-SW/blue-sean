import API from '@/service/request'

export function getAllCity() {
  return API.post('/express/getAllCity')
}

export function getSearchAddress(params) {
  return API.post('/address/getAddress', params)
}
// step1 发件人
export function setSenderApi(params) {
  return API.post('/express/setSender', params)
}

export function getSessionSender(params) {
  return API.post('/express/getSender', params)
}
// step2 收件人
export function setRecipientApi(params) {
  return API.post('/express/setRecipient', params)
}

export function getSessionRecipient(params) {
  return API.post('/express/getRecipient', params)
}

// step2 可选时间
export function getOptionalTime(params) {
  return API.post('/express/getOptionalDate', params)
}

export function getDayOrTime(params) {
  return API.post('/express/selectDateTime', params)
}

export function methodOfPayment(params) {
  return API.post('/express/payOrder', params)
}
