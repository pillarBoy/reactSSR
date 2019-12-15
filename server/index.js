// 这里的node代码会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import {StaticRouter, matchPath, Route} from 'react-router-dom'
import routes from '../src/App'
import axios from 'axios'

import express from 'express'

import {Provider} from 'react-redux'
import {getServerStore} from '../src/store/store'
import Header from '../src/components/Header'


const app = express()
// 设置静态资源目录
app.use(express.static('public'))

// 获取根据路由渲染的组件 ， 并拿到loadData

const store = getServerStore()

// 接受所有 路由
app.get('*', (req, res) => {
  // api开头 接口请求
  if (/^\/api/.test(req.url)) {
    // console.log(req.method, req.url)
    axios({
      url: 'http://localhost:9090'+req.url,
      method: req.method,
    }).then(ares => {
      res.json(ares.data)
    })
    
  } else {
    // inside a request
    const promises = []
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    routes.some(route => {
      // use `matchPath` here
      const match = matchPath(req.path, route);
      if (match) {
        let {loadData} = route.component
        if (loadData) {
          promises.push(new Promise(resolve => {
            loadData(store)
            .then(res => resolve(res))
            .catch(error => resolve(error))
          }))
        }
      }
      // return match;
    });

    
    Promise.all(promises).then(() => {
      // 把react组件，解析成html
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
          <Header></Header>
            {
              routes.map(route => <Route {...route}></Route> )
            }
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
            <script>
            window.__context=${JSON.stringify(store.getState())}
            </script>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `)
    }).catch((err) => {
      res.send('api error')
    }) 
  }
})

app.listen(8088, () => {
  console.log('wacth')
})