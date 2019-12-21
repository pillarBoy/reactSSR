import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from '../src/App'
import { getServerStore } from '../src/store/store'
import Header from '../src/components/Header'

const store = getServerStore()


function csrRender(res) {
  // 读取文件
  const filenanme = path.resolve(process.cwd(), 'public/index.csr.html')
  let html = fs.readFileSync(filenanme, 'utf8')
  res.send(html)
}

function ssrRender(req, res) {
  // inside a request
  const promises = []
  // the first to match
  routes.some(route => {
    /// 获取根据路由渲染的组件 ， 并拿到loadData
    const match = matchPath(req.path, route);
    if (match) {
      let { loadData } = route.component
      if (loadData) {
        promises.push(new Promise(resolve => {
          loadData(store)
            .then(res => resolve(res))
            .catch(error => resolve(error))
        }))
      }
    }
  })

  Promise.all(promises).then(() => {
    const context = {}

    // 把react组件，解析成html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
        </StaticRouter>
      </Provider>
    )
    if (context.statuscode) {
      res.status(context.statuscode)
    }
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }

    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>react ssr</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script> window.__context=${JSON.stringify(store.getState())}</script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  }).catch((err) => {
    res.send('api error')
  })
}

export default ssrRender