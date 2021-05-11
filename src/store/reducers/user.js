import { LOGIN, LOGIN_USER, LOGOUT } from '@/store/constants/user'

const INITIAL_STATE = {
  isLogin: false,
  loginUser: null,
}

export default function setInformation(state = INITIAL_STATE, action) {
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
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.loginUser
      }
    default:
      return state
  }
}
