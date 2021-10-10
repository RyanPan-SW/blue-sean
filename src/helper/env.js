import Cookies from 'js-cookie'

export function isOpenPages(pathname) {
  return pathname.startsWith('/o/')
}

export function setCookie(name, value, expires) {
  Cookies.set(name, value, { expires: expires || 7 })
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function clearAllCookie() {
  Cookies.remove('token')
}

export const emailMsg = {
  email: 'Please enter a valid email address.',
  emailReg: /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/,
}

export const passwordMsg = {
  required: 'Please use at least 6 characters. Remember: Passwords are case sensitive.',
  length: 'Password must be between 6 and 20 characters.',
  pattern:
    'Use a password of at least 6 characters. Suggest you include an uppercase letter, a lowercase letter, a number, and a special character.',
}

export const getUrlParams = (name = '') => {
  var url = window.location.search; //获取url中"?"符后的字串
  var theRequest = {};
  if (url.indexOf("?") !== -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  if (name === "") {
    return theRequest;
  } else {
    return theRequest[name] ? theRequest[name] : '';
  }
}


export const patterns = {
  email: /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/,
  // pwd: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
  pwd: /^[\w!@#$%^&*?~]+$/,
  name: /^[a-zA-Z_][0-9a-zA-Z_]{0,}$/,
  tel: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
  IP: /^(?=(\\b|\\D))(((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))\\.){3}((\\d{1,2})|(1\\d{1,2})|(2[0-4]\\d)|(25[0-5]))(?=(\\b|\\D))$/,
  IDCard: /(^\\d{15}$)|(^\\d{17}([0-9]|X)$)/,
  ZIPCode: /^[1-9]\d{5}(?!\d)$/,
}

export const orderDetailEnums = {
  '00': 'Unpaid',
  '01': 'Pending',
  '02': 'In transit',
  '03': 'Delivered',
  '04': 'Canceled',
}

export const orderStatusEnums = {
  Unpaid: '00',
  Pending: '01',
  InTransit: '02',
  Delivered: '03',
  Canceled: '04',
}


export const payMerhod = {
  '01': 'Visa',
  '02': 'Corporate payment',
  '03': 'PayPal',
  '04': 'Bank transfer'
}