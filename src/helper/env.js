import { TOKEN_KEY } from '@/config'
import cookie from 'react-cookies'

export function isOpenPages(pathname) {
  return pathname.startsWith('/o/')
}

export function setCookie(parmas, days = 1) {
  let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000 * days) // 一个月
  return cookie.save('userId', parmas, { expires: inFifteenMinutes })
}

export function getCookie(key) {
  return cookie.load(TOKEN_KEY)
}
