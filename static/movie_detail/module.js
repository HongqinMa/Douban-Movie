angular.module('movie.detail', [])
  .controller('DetailController', [
    '$scope', 
    '$http', 
    '$routeParams',
    function($scope, $http, $routeParams){
      // 通过路由参数拿到 id
      var movie_id = $routeParams.id;
      $scope.movie = {};
      $http({
        method: 'get',
        // 发起这个请求
        url: '/movie/subject/' + movie_id
      })
      .then(function(data) {
        $scope.movie = data.data;
      });
  }]);
