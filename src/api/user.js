/* 用户相关 */
import request from '@/service/request'

/**
 * @export
 * @param {*}
 * @returns
 */
export function test() {
  return request({
    url: '/hy-goods/app/goods/detail?timeNow=1605355654652&goodsId=1604393859283',
    method: 'get',
  })
}
