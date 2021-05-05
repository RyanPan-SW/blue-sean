import { TOKEN_KEY } from '@/config'
import cookie from 'react-cookies'

export function isOpenPages(pathname) {
  return pathname.startsWith('/o/')
}

export function setCookie(parmas, days = 1) {
  let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000 * days) // 一个月
  return cookie.save('token', parmas, { expires: inFifteenMinutes })
}

export function getCookie(key) {
  return cookie.load(key)
}

export function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--; )
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
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

export const enumsOrderStatus = {
  1: 'Pending',
  2: 'In transit',
  3: 'Delivered',
  4: 'Canceled',
}
