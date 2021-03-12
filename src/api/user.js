/* 用户相关 */
import API from '@/service/request'

/**
 * @export
 * @param {*}
 * @returns
 */
export function test() {
  return API({
    url: 'http://localhost:8081/askQuestion',
    method: 'get',
  })
}
