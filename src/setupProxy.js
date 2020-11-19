const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://testh5.hanyuan.vip',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    }),
  )
}
