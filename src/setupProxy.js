const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/dcexpress', {
      target: 'http://175.27.210.239:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/dcexpress': '/dcexpress',
      },
    }),
  )
  app.use(
    createProxyMiddleware('/dcadmin', {
      target: 'http://175.27.210.239:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/dcadmin': '/dcadmin',
      },
    }),
  )
}
