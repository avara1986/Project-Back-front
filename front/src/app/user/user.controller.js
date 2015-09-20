(function() {
  'use strict';

  angular
    .module('front')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($timeout, $scope, $http, apiurl) {
    var vm = this;
    $scope.user = {
      username: 'admin',
      password: 'admin'
    };
    $scope.submit = function() {
        $scope.master = angular.copy($scope.user);
        console.log($scope.master);
        $http.post(apiurl+'/api-token-auth/', $scope.master)
        .success(function(data) {
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
        });
    }
  }
})();
