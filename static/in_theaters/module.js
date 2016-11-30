(function (angular) {
  angular.module('movie.in_theaters', [])
    .controller('InTheaterController', [
      '$scope', 
      '$http',
      // 专门拿路由当中的请求参数的
      '$routeParams',
      // 专门处理路由的
      '$route', 
      function ($scope, $http, $routeParams, $route) {
        $scope.title = 'Loading...';
        $scope.total = 0;
        $scope.movie_list = {};
        var pageSize = 10;
        $scope.totalPage = 0;
        // 使用主模块 app.js 中的动态路径中的 page 时可以通过 $routeParams.page 来拿到
        $scope.page = $routeParams.page ? parseInt($routeParams.page) : 1;
        // console.log($routeParams);
        //$http
          // 跨域请求，直接用get 报错
          // .get('http://api.douban.com/v2/movie/in_theaters?count=5')
          // ng 中的 jsonp
          // .jsonp('http://api.douban.com/v2/movie/in_theaters?count=5&callback=JSON_CALLBACK')
          // URL 变成了：http://api.douban.com/v2/movie/in_theaters?count=5&callback=angular.callbacks._0
          // 数据回来了，但是报了常见语法错误，
          // 返回的数据并没有拼接上： angular.callbacks._0，把里面的 . 改成下划线 _ 就可以拼接到数据前面了。
          // 原因是豆瓣 API 不支持，豆瓣 API 中只包含数字、字母、下划线，长度不大于 50
          // 解决：自己写一个 jsonp 方法
          // 另一种方法：前后端分离：用 node 来请求数据，把项目跑到 node 里面，完全不用考虑跨域。
          // node 做一个中间层，专门来做 UI 渲染
          // .then(data => {
          //   console.log(data);
          // });
        // $http.get('/in_theaters', {
        //   // 需要查询字符串，查询第几页，get() 方法不支持这样配置
        //   data: {
        //     stat: ($scope.page -1) * pageSize,
        //     count: pageSize
        //   }
        // })
        $http({
          method: 'get',
          url:'/movie/' + $routeParams.category,
          // get 请求数据使用 params
          // post 请求使用 data 属性
          params: {
            start: ($scope.page -1) * pageSize,
            count: pageSize,
            // 这里的 q 只是针对 search 有效，如果不是 search，豆瓣会忽略
            q: $routeParams.q
          }
        })
          .then(data => {
            var result = data.data;
            $scope.movie_list = result;
            $scope.title = result.title;
            $scope.total = result.total;
            $scope.totalPage = Math.ceil(result.total/pageSize);
          });
        $scope.go = function(page) {
          // console.log(page)
          // 如果这个页面小于等于 0 了 或者 > 最大页面时不去处理
          if (page <= 0 || page > $scope.totalPage) {
            return;
          }
          // 路径中传页码
          // 使用路由提供的 API 更新当前请求路径中的请求参数
          // 只要更新了路由中的参数，即 # 后面的内容，当前页面中的路由会被重载
          $route.updateParams({
            page: page
          });
        }
    }])
})(angular);
