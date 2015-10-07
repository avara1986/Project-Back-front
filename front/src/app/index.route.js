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
        url: '/gettingstarted',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: partials_folder+"getting_started.html"
            }

        },})
        .state('freakcompilations', {
        url: '/freakcompilations',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: partials_folder+"freakcompilations.html",
                controller: 'FreakController',
                controllerAs: 'freak'
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
        }})
        .state('emailurl', {
        url: '/email/from-url',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: "app/email/form_url.html",
                controller: 'EmailUrlController',
                controllerAs: 'EmailUrl'
            }

        },})
        .state('emailhtml', {
        url: '/email/from-html',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: "app/email/form_html.html",
                controller: 'EmailHtmlController',
                controllerAs: 'EmailHtml'
            }

        },})
        .state('emailhistory', {
        url: '/email/history',
        views: {
            "header": { templateUrl: header },
            "menu": { templateUrl: menu },
            "content": { 
                templateUrl: "app/email/history.html",
                controller: 'EmailHistoryController',
                controllerAs: 'EmailHistory'
            }

        },});

    $urlRouterProvider.otherwise('/');
  }

})();
