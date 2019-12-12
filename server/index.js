// 这里的node代码会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import express from 'express'
import App from '../src/App'

import {Provider} from 'react-redux'
import store from '../src/store/store'


const app = express()
// 设置静态资源目录
app.use(express.static('public'))

// 接受所有 路由
app.get('*', (req, res) => {
  // 把react组件，解析成html
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        {App}
      </StaticRouter>
    </Provider>
  )

  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>react ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `)
})

app.listen(9093, () => {
  console.log('wacth')
})