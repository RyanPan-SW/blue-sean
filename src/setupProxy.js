const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://175.27.210.239:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/dcexpress': '/dcexpress',
      },
    }),
  )
}
