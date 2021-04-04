import API from '@/service/request'
import querystring from 'querystring'

export function getOrdersList(params) {
  return API.get('/searchOrder')
}

export function getOrderDateils(params) {
  let str = querystring.stringify(params)
  return API.get(`/order/detail?${str}`)
}