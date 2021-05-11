import { LOGIN, LOGIN_USER, LOGOUT } from '../constants/user'

export const login = () => ({ type: LOGIN })

export const logout = () => ({ type: LOGOUT })

export const setLoginUser = (user) => ({ type: LOGIN_USER, loginUser: user })
