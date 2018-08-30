# Lymn-Blog

个人博客，采用前后端分离+服务端渲染(SSR)的技术

#### 开发环境

* Sublime + VSCode
* Node + MySQL + Redis 

### 技术栈：  

#### 前端：
* 单页面应用Vue
* 状态管理Vuex
* 前端路由Vue-Router
* 服务端渲染Express
* 通信库axios
* 缓存lru-cache

#### 后端
* 基于Node.js的框架Koa
* 路由Koa-Router
* 数据库MySQL
* 权限验证JWT+Redis
* 测试mocha

#### 服务器端
* 阿里云
* 反向代理Nginx

#### 安装Node
* [Windows下安装Node](https://www.cnblogs.com/zhouyu2017/p/6485265.html)

#### 安装MySQL
* [Windows下安装MySQL](https://www.cnblogs.com/reyinever/p/8551977.html)

#### 安装Redis
* [Windows下安装Redis](https://www.cnblogs.com/lezhifang/p/7027903.html)

#### 安装依赖
* 分别在client和server分别安装
```
npm install
```

#### 运行服务端

配置
```
var config={
    dialect:'mysql',
    database:'lymn_blog',
    username:'',//数据库用户名
    password:'',//数据库密码
    host:'localhost',
    port:3306
}

module.exports=config;
```

运行
```
npm start
```

#### 运行客户端

```
//开发模式 dev
npm run dev

//生产模式 prod
npm run build && npm run start
```
