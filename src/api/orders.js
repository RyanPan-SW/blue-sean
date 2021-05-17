import API from '@/service/request'

export function getOrdersListApi(params) {
  return API.post('/order/getOrders', params)
}

export function searchOrderApi(params) {
  return API.post('/searchOrder', params)
}

export function getOrderDateilsApi(params) {
  return API.post('/order/getOrderDetailById', params)
}

export function cancelOrderApi(params) {
  return API.post('/order/cannelOrder', params)
}

export function getOrderIsCheckedApi(params) {
  return API.post('/order/checkOrderCanCannel', params)
}

export function updateSenderAndRecipient(params) {
  return API.post('/order/updateSenderAndRecipient', params)
}
