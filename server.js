// 这里的node代码会用babel处理
const express = require('express')
const next = require('next')
const proxyMiddleware = require('http-proxy-middleware')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/')
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  const proxyTable = {
    '/resources': {
      target: 'https://extension-ms.juejin.im',
      secure: false,
      // pathRewrite: {'^/api' : ''},
      changeOrigin: true
    }
  }

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    server.use(proxyMiddleware(context, options))
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})