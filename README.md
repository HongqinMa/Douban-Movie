## 豆瓣电影列表项目说明

> 使用 AngularJS + Bootstrap + Node.js 构建的一个电影列表展示单页应用

## 豆瓣开发接口 API

- 所有的接口地址都是以：http://api.douban.com/v2 开头的
- 正在热映 http://api.douban.com/v2/movie/in_theaters
- 即将上映 http://api.douban.com/v2/movie/coming_soon
- top250 http://api.douban.com/v2/movie/top250
- search http://api.douban.com/v2/movie/search?q={text}
- 电影条目接口: http://api.douban.com/v2/movie/subject/:id

## 启动项目

``` bash
  $ nodemon add.js
```

或者：

``` bash
  $ node add.js
```

## 项目骨架

- app
  + app.js
  + app.css
  + index.html
  + in_theaters
    * view.html
    * module.js
  + coming_soon
    * view.html
    * module.js
  + top250
    * view.html
    * module.js
- READMO.md
- .gitignore
- .editorconfig
- bower.json
- .bowerrc

## 页面开发流程：

### (一)、构建页面（bootstrap）

选择模板 --> 列表组 --> 媒体组件

### (二)、模块划分

> 中间变化部分每一个对应一个视图： view.html 和 模块 module.js

in-theaters 正在热映视图、正在热映控制器、正在热映对应的模型代码

coming-soon 即将上映视图、即将上映控制器、即将上映对应的模型代码

top250 top250视图、top250控制器、top250模型代码

局部 HTML 发生变化。

> 路由：

- Node 中的路由：后台接收请求，渲染了了不同的页面。
- 前端路由，当点击一个连接的时候，显示不同的页面，不需要后台，前端也可以渲染，无非前端的路由变成了哈希值了。

主模块：--> view 里放变化的中间的内容：怎么放？怎么加载？点击即将上映，局部 HTML 发生变化。--> 前端路由

``` html
  <div ng-view class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <!-- 每一页不同的部分 -->
  </div>
```

**这回是前端路由，前端的路由变成了 hash 值。**

> `view.html` 中放中间变化的内容

### (三)、模块划分-控制器-路由

通过主模块加载 3 个小模块

主页面： index.html

主模块： app.js

> 正在上映模块：/in_theaters/module.js
> 即将上映模块：/comming_soon/module.js
> top250 模块 /top250/module.js

### (四)、绑定假数据

主页面视图：static/index.html

其他模块视图：in_theaters/view.html

### (五)、请求 API，将数据绑定到视图

> 用 node 来请求数据，把项目跑到 node 里面，完全不用考虑跨域，node 做一个中间层，专门来做 UI 渲染。

#### 安装 express

```bash
  $ npm install express request --save
```

- Node 中转请求接口 app.js
- 主模块 app.js
- 配置文件路径：
- 其它模块 module.js

### (六)、通过路由实现简单的分页传参功能

路径中传页码，使用路由提供的 API 更新当前请求路径中的请求参数。

### (七)、通过配置路由参数实现多模块重用

ng 中和后台原理相似，都支持路由参数

### (八)、利用自定义指令解决导航栏状态切换

> 在需要操作 DOM 时

### (九)、解决详情页搜索问题

## 总结

> 整个小项目工作流程

- 前台主模块加载其它模块并设置路由，
- 前台其它模块 module.js 中的 $http 发起请求
- 请求中转 app.js
- 中转 app.js 向后台（豆瓣 API）发起请求
- 再由中转 app.js 将数据响应给前台 module.js
- 前台数据绑定，渲染视图
