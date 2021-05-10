import { ADD, MINUS } from '@/store/constants/counter'

const INITIAL_STATE = {
  num: 0,
}

export function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1,
      }
    default:
      return state
  }
}
