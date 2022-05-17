export const TOKEN_KEY = 'token'

export const API_HOST =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : 'http://120.48.28.166:8080'
export const COR_API_HOST =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_COLS_URL
    : 'http://120.48.28.166:8070'

// 生产地址 http://139.180.206.56:8080/dcexpress
