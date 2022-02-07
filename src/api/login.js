import http from '@/service/http';
import API from '@/service/request'
import qs from 'qs';

// use login
export function loginApi(params) {
  return API.post('/dcexpress/login/dologin', params)
}

// corporate login
export function CoprporateLogin(params) {
  // return API.post('/dcadmin/login', qs.stringify(params))
  return http({
    url:'/dcadmin/login',
    method: 'post',
    data: qs.stringify(params),
    // headers['Content-Type']:
  })
}
