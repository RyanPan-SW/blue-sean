import { ADD, MINUS, QUESTIION } from '@/store/constants/counter'

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

export function question(state = INITIAL_STATE, action) {
  switch (action.type) {
    case QUESTIION:
      return {
        ...state,
      }
    default:
      return state
  }
}
