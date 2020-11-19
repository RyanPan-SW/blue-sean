const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://tesh5.hanyuan.vip',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // rewrite path
    },
  }),
)
app.listen(3000)
