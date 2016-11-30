
// 主模块加载其它模块，就可以使用别的模块中的控制器了
angular.module('movie.main', [
    'movie.in_theaters',
    'movie.comming_soon',
    'movie.top250',
    'movie.detail',
    'ngRoute'
  ])
  // 设置路由
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      // 请求首页时
      .when('/', {
        redirectTo: '/in_theaters/1'
      })
      // 为了避免路径匹配问题，将这个放到前面
      .when('/subject/:id', {
        templateUrl: 'movie_detail/view.html',
        controller: 'DetailController'
      })
      // 路径中传页码
      // ng 中的路由支持这样的形式和后台一样动态处理路由
      .when('/:category/:page?', {
        // 渲染这个视图
        templateUrl: 'in_theaters/view.html',
        // 调这个控制器
        controller: 'InTheaterController'
      })
      // .when('/coming_soon',{
      //   templateUrl: 'coming_soon/view.html',
      //   controller: 'ComingSoonController'
      // })
      // .when('/top250',{
      //   templateUrl: 'top250/view.html',
      //   controller: 'Top250Controller'
      // })
      // 是指跳转到当前路由了
      .otherwise({
        redirectTo: '/in_theaters'
      })
  }])
  // 搜索框功能
  .controller('searchController', [
    '$scope', 
    '$route',
    function($scope, $route) {
      $scope.search_text = [];
      $scope.search = function(){
        // console.log($scope.search_text);
        $route.updateParams({
          category: 'search',
          page:'1',
          // 路由中，如果没有该路径参数，则更新一个不存在的路由参数，路由自动帮你变成查询字符串
          q: $scope.search_text
        });
      };
    }
  ])
  .directive('movieActive', ['$location', function ($location) {
    return {
      link: function ($scope, iElm, iAttrs, controller) {
        // 获取当前 url ，根据 url 找到对应的 li ，让 li 获得 active 样式，其它 li 去除 active
        $scope.$location = $location;
        $scope.$watch('$location.url()', function (newVal, oldVal) {
          var currentUrl = newVal.split('/')[1];
          // Array.from 可以将一个伪数组转换成一个真的数组
          Array.from(iElm.find('a')).forEach(function (a) {
            angular.element(a).parent().removeClass('active');
            if (a.hash.substr(2) === currentUrl) {
              angular.element(a).parent().addClass('active');
            }
          });
        });
      }
    };
  }]);
