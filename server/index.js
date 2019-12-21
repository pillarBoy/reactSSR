// 这里的node代码会用babel处理
import express from 'express'
import httpProxyMiddleware from 'http-proxy-middleware'

import csrRender from './csrRender'
import ssrRender from './ssrRender'

// 设置axios的默认URL
// axios.defaults.baseURL = 'http://localhost:9090'

const app = express()
// 设置静态资源目录
app.use(express.static('public'))
app.use('/api', httpProxyMiddleware({
  target: 'http://localhost:9090',
  changeOrigin: true
}))

// 接受所有 路由
app.get('*', (req, res) => {
  // csr 降级处理
  if (req.query._mode == 'csr') {
    return csrRender(res);
  }

  // ssr render 
  ssrRender(req, res)
})

app.listen(8088, () => {
  console.log('wacth')
})