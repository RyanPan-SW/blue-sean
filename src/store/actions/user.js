import { LOGIN, LOGOUT } from '../constants/user'

export const login = () => ({
  type: LOGIN,
})

export const logout = () => ({
  type: LOGOUT,
})
