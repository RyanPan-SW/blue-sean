const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/dcexpress', {
      // target: 'http://120.48.28.166:8080',
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/dcexpress': '/dcexpress',
      },
    }),
  )
  app.use(
    createProxyMiddleware('/dcadmin', {
      // target: 'http://120.48.28.166:8080',
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: {
        '^/dcadmin': '/dcadmin',
      },
    }),
  )
}
