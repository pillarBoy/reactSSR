# ssr引入页面css
 - client端，跟之前的开发一样，webpack加入`style-loader`，`css-loader`,然后在组件import css即可
 - server端，webpack需要加入`isomorphic-style-loader`, `css-loader`,
   其他配置看`isomorphic-style-loader`文档，目前引入css只是加入到了js里，所以页面到样式会在js加载完毕才处理

# 静态资源
直接把静态资源添加到public文件夹，用绝对路径请求即可(当前情况)


# notfound Page
- 利用StaticRouter 的context往组件传递空对象,它(StaticRouter)会把这个context传给每一个页面和组件的props
- 然后创建Notfound 页面，并且把props.context.statuscode 修改为404, 注意路由找不到对应的页面，就渲染Notfound页面
- 服务端判断`context.statuscode`存在，就把server端的`response.status = context.statuscode`


# csr 
- 服务端根据某中约定端条件，切换到CSR渲染函数，输出的就是SPA的入口html
- 客户端增加入口文件输入
  1. `webpack.client.js`增加`html-webpack-plugin`plugin,输出`index.csr.html`文件到public
  2. `client/index.js`需要判断是否为csr渲染(是否有window.__content,这种条件可以自己定义，只要能判断是否csr渲染即可)， 
     csr使用reactDom.render方法，ssr使用reactDom.hydrate(注水方式
  

