# reactSSR
react ssr practice


### 同构（个人理解）
优点
- 就是一套代码适用于服务端和客户端渲染页面
- 首次访问可以在服务端渲染，优化首屏显示，用户操作时(非刷新)在客户端渲染，保留了SPA的优点
- 可以做SEO

缺点
- 如果访问量大的情况，对服务器造成很大压力