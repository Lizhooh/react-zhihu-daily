## react-zhihu-daily
基于 React.js 实现的 Webapp 知乎日报 (非官方)

![](/resource/demo.gif)

### 要点
- 使用 Sass 来预处理 CSS，编写基于 CSS3 的动画效果
- 基于 Flexbox 页面布局
- 使用 Babel 来来编译 ES6 生成兼容性的 ES5 代码
- 使用 Fetch.js, Promise 来进行异步的网络请求
- 使用 React 搭手架：Create-React-App 来创建项目
- 使用 Webpack 来打包组件模块
- 使用 React-Router 来管理前端路由
- 使用 Redux 来管理组件数据状态，形成单一的数据流
- 使用 Nodejs (v7.6+) 进行反向代理 API 服务（突破同源限制）

### install

``` bash
# install dependencies
npm install

# before, install nodejs server
cd ./server
npm install
```

### Use
在 Chrome 上使用手机预览模式（F12 => ctrl + shift + m）

```bash
# 先启动 nodejs 服务
npm run server

# 再启动 Webapp，在 localhost:3000
npm start

# 编译整个应用
npm run build
```

## License
此作品，仅限于个人兴趣与学习。