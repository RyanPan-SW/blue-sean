import { LOGIN, LOGOUT } from '@/store/constants/user'

const INITIAL_STATE = {
  isLogin: false,
}

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      }
    default:
      return state
  }
}
