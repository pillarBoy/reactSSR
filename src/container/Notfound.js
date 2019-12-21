import React from 'react'
import {Route} from 'react-router-dom'
 
function Status({code, children}) {
  return <Route render={({staticContext}) => {
    if (staticContext) {
      staticContext.statuscode = code
    }
    return children
  }}></Route>
}

function Notfound(props) {
  console.log(props)
  // 渲染这个组件， 给staticeContext 赋值， statuscode=404
  return <Status code={404}>
    <h1>404 page</h1>
    <img id="notfound" src="/404.png" alt=""/>
  </Status>
}

export default Notfound