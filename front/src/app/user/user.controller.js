(function() {
  'use strict';

  angular
    .module('front')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($timeout, $rootScope, $http, $cookies, apiurl) {
	$rootScope.is_login = $cookies.get('is_login');
	this.is_login = false;
	console.log($rootScope.is_login);
	$rootScope.user = $cookies.getObject('user');
  }
})();
