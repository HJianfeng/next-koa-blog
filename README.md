# next.js + koa2 + mongoose 全栈博客

## 用到的技术
- next.js@9.0.2
- antd.js@3.23.2
- koa.js@2.7.0
- mongoose@5.7.1  用于操作mongoDB
- koa-jwt  登录权限验证
- react-markdown  markdown 编辑器

## 模块
- 首页文章列表
- 文章详情页
- 登录注册。使用`koa-jwt`进行`token`的生成和验证。不对外开放注册，仅管理员可注册登录。
- 写文章。`markdown`编辑器编写，仅管理员可创建文章。
- 编辑、删除文章

## 你可以学到什么
1. `next.js`搭建一个服务端渲染的应用
2. `mongoDB`数据库的操作和使用
3. `react hooks` 基础用法
4. 前端全栈开发
5. `markdown` 编辑器和 `markdown` 文章展示

## Install dependencies
`yarn add`

## Run development server
`npm run dev`

## Build for production
`npm run build`

## 目录
```javascript
.
├── components              // 组件
│   ├── Footer
│   ├── Header
│   ├── Home
│   ├── Layout
│   ├── Posts
│   ├── Recommend
│   └── marked
├── pages                   // 页面
│   ├── _app.js
│   ├── editor
│   ├── index
│   ├── login
│   └── post
├── server                  // 服务端文件
│   ├── app
│   │   ├── controllers     // 接口
│   │   ├── db              // 连接数据库
│   │   ├── models          // 数据库model
│   │   └── utils           // 服务端工具函数
│   ├── index.js            // 服务端入口
│   └── router              // 接口路由
│       └── index.js
├── static                  // 静态文件
├── store                   // redux
├── utils
│   ├── api                 // API请求
│   ├── axios.js
│   └── index.js            // 客户端工具函数
├── next.config.js          // next.js 配置文件
├── nodemon.json            // nodemon 配置文件
├── package.json
└── README.md
```