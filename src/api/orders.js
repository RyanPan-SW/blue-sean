import API from '@/service/request'

export function getOrdersListApi(params) {
  return API.post('/dcexpress/order/getOrders', params)
}

export function searchOrderApi(params) {
  return API.post('/dcexpress/searchOrder', params)
}

export function getOrderDateilsApi(params) {
  return API.post('/dcexpress/order/getOrderDetailById', params)
}

export function cancelOrderApi(params) {
  return API.post('/dcexpress/order/cannelOrder', params)
}

export function getOrderIsCheckedApi(params) {
  return API.post('/dcexpress/order/checkOrderCanCannel', params)
}

export function updateSenderAndRecipient(params) {
  return API.post('/dcexpress/order/updateSenderAndRecipient', params)
}
