(function() {
  'use strict';

  angular
    .module('front')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
        url: '/',
        views: {
            "header": { templateUrl: "app/main/header.html" },
            "menu": { templateUrl: "app/main/menu.html" },
            "content": { 
                templateUrl: "app/main/main.html",
                controller: 'MainController',
                controllerAs: 'main'
            }

        },

        })
        .state('login', {
        url: "/login",
        views: {
            "header": { templateUrl: "app/main/header.html" },
            "menu": { templateUrl: "app/main/menu.html" },
            "content": { 
                templateUrl: "app/user/login.html",
                controller: 'UserController',
                controllerAs: 'user'
            }
        },
    });

    $urlRouterProvider.otherwise('/');
  }

})();
