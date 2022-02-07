import API from '@/service/request'

export function getAddressPagination(params) {
  return API.post(`/dcexpress/address/getAddress`, params)
}

export function addNewAddress(params) {
  return API.post(`/dcexpress/address/addAddress`, params)
}

export function updateAddress(params) {
  return API.post(`/dcexpress/address/updateAddress`, params)
}

export function setDefaultAddress(params) {
  return API.post(`/dcexpress/address/setDefault`, params)
}

export function deleteAddress(params) {
  return API.post(`/dcexpress/address/delAddress`, params)
}

export function cannelDefault(params) {
  return API.post(`/dcexpress/address/offDefault`, params)
}
