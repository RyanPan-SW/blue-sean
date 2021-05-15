import API from '@/service/request'
import querystring from 'querystring'

export function getOrdersListApi(params) {
  return API.post('/order/getOrders', params)
}

export function searchOrder(params) {
  return API.post('/searchOrder', params)
}

export function getOrderDateils(params) {
  let str = querystring.stringify(params)
  return API.post('/order/getOrderDetailById', params)
}

export function getOrderIsChecked(params) {
  return API.post('/order/checkOrderCanCannel', params)
}
