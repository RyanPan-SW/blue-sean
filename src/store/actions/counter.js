import request from '@/service/request'
import { ADD, MINUS } from '../constants/counter'

export const add = () => ({
  type: ADD,
})
export const minus = () => ({
  type: MINUS,
})

// 异步的action
export function asyncAdd() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}

export function question() {
  request({
    url: 'http://localhost:8081/askQuestion',
    method: 'get',
  }).then((res) => {
    return (dispatch) => {
      dispatch({ type: 'QUESTION' })
    }
  })
}
