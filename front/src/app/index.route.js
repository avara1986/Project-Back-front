(function() {
  'use strict';

  angular
    .module('front')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    var partials_folder = "app/partials/";
    var header = partials_folder+"header.html";
    var menu = partials_folder+"menu.html";
    $stateProvider
        .state('home', {
        url: '/',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: "app/main/main.html",
                controller: 'MainController',
                controllerAs: 'main'
            }

        },})
        .state('getstart', {
        url: '/getting-started',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: partials_folder+"getting_started.html"
            }

        },})
        .state('login', {
        url: "/login",
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: "app/user/login.html",
                controller: 'UserController',
                controllerAs: 'user'
            }
        }});

    $urlRouterProvider.otherwise('/');
  }

})();
