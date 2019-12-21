# reactSSR
react ssr practice


### 同构（个人理解）
优点
- 就是一套代码适用于服务端和客户端渲染页面
- 首次访问可以在服务端渲染，优化首屏显示，用户操作时(非刷新)在客户端渲染，保留了SPA的优点
- 可以做SEO

缺点
- 如果访问量大的情况，对服务器造成很大压力


## concurrently 优化开发体验
使用concurrently 同时启动客户端、服务端、node服务3个进程，优化开发体验

使用方法：
`concurrently \"命令脚本1\" \"命令脚本2\" \"命令脚本3\"`


## 路由支持

- 服务器端 使用 StaticRouter,并把req.url赋予给location,同时把路由监听改为 `*`
- client 使用 BrowserRouter

问题：
- 如果有静态资源请求，需要怎么处理？怎么区分是route请求，还是其他资源请求？



## store 支持
- 如果需要在渲染前获取接口数据，需在服务端 赋予store默认值为请求回来的数据即可

    问题
    - client(客户)端，有什么需要特别处理的吗？
    - 通过什么方式让store知道需要在服务端请求数据，并把数据赋予store默认值

    小坑注意
    - 客户端和服务端的前端入口，必须同时都添加 Store支持，否则就会有报错。


## 异步获取数据
参考next的方法,给component增加一个loadData方法，在服务端执行loadData方法，把接口数据先拿到，然后赋予store初始值，然后再执行服务端渲染，并且要把这个初始值传给客户端，客户端在初始化时设置store的初始值。

基本步骤：
1. component 增加一个loadData方法
2. 在服务端执行对应页面到loadData方法
3. 把接口数据设置给store的默认值(初始值)
4. 把初始值传给客户端（window.__content）
5. 执行服务端渲染
6. 客户端获取store初始值（window.__content）并设置为默认值


## 作业1
服务端多个请求，有一个接口报错了，不影响其他接口数据响应。

核心：处理服务端接口报错，不阻碍其他接口执行，并返回错误结果。

思路：
1. 如果是要使用promise.all,只要不要让接口走 promise reject这个方法即可
2. 不实用promise.all,循环处理所有的请求，全部接口执行完毕，再响应服务端渲染


## 作业2 
所有的接口请求，都发到server端，在server准发到api接口，然后返回给client端

- server端区分页面请求和接口请求，做不同处理
- 对axios做默认配置

作业总结：
axios 要区分客户端和服务端，两个做不同的配置,
server端不需要代理，直接请求，
client端所有的接口请求，转到服务端再转发，
client端的请求，再server端增加一个`http-proxy-middleware`代理。


问题：
- 如果有要请求第三方接口的特殊接口，并且要在loadData执行，怎么处理？
老师说，可以专门添加一个.get(or post)来专门处理


[第四节课笔记和总结](lesson4.md)