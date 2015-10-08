(function() {
  'use strict';

  angular
    .module('front')
    .controller('EmailUrlController', EmailUrlController)
    .controller('EmailHtmlController', EmailHtmlController)
    .controller('EmailHistoryController', EmailHistoryController)
    .factory('SendEmailApiFactory', ['$rootScope','$http', '$cookies', '$mdToast', 'apiurl', SendEmailApiFactory])
    .factory('getContactsApiFactory', ['$rootScope', '$http', '$cookies', 'apiurl', getContactsApiFactory]);

  function SendEmailApiFactory($rootScope, $http, $cookies, $mdToast, apiurl) {
      var parseData = function(data){
          var ndata = new Object();
          ndata.url = data.url;
          ndata.content = data.html;
          ndata.subject = data.subject;
          ndata.g_token = $cookies.get('g_token');
          ndata.user = $cookies.getObject('user').email;
          ndata.to = [];
          for (var i = 0; i < data.to.length; i++) { 
              var aux = new Object();
              console.log(data.to[i]);
              if (data.to[i].email !=undefined){
                  aux = data.to[i];
              }else{
                  aux.email = data.to[i];
              }
              
              
              ndata.to.push(aux);
          }
          return ndata;
      }
      return function(email, url) {
          $rootScope.show_server_errors=false;
          $(".page-loading").removeClass("hidden");
          $http.post(apiurl+url, parseData(email))
          .success(function(data) {
              $(".page-loading").addClass("hidden");
              $mdToast.show(
                    $mdToast.simple()
                      .content('Email sent Ok! ;)')
                      .position('top right')
                      .hideDelay(3000)
                  );
          }).
          error(function(data, status, headers, config) {
              console.log(data);
              console.log(status);
              console.log(headers);
              console.log(config);
              if(data.detail=='invalid_token'){
                  $cookies.putObject('user','');
                  $cookies.put('g_token','');
                  $cookies.put('is_login',false);
                  $rootScope.is_login=false;
                  $rootScope.user="";
                  $rootScope.form_error_msg="Tu sesión con Google ha expirado, vuelve a loguear.";
              }else{
                  $rootScope.form_error_msg=data;
              }
              $(".page-loading").addClass("hidden");
              $rootScope.show_server_errors=true;
              $mdToast.show(
                        $mdToast.simple()
                          .content('Backend Error!')
                          .position('top right')
                          .hideDelay(3000)
                      );
          });
      }
  }
  function getContactsApiFactory($rootScope, $http, $cookies, apiurl) {
      return function() {
          $rootScope.readonly = false;
          $rootScope.selectedItem = null;
          $rootScope.searchText = null;
          $rootScope.querySearch = querySearch;
          $rootScope.contacts = loadContacts();
          function querySearch (query) {
              var results = query ? $rootScope.contacts.filter(createFilterFor(query)) : [];
              return results;
          }
          function createFilterFor(query) {
              var lowercaseQuery = angular.lowercase(query);
            
              return function filterFn(contact) {
                return (contact._loweremail.indexOf(lowercaseQuery) === 0);
              };
          }
          function loadContacts() {
              $http.get(apiurl+'contacts/?g_token='+$cookies.get('g_token')+"&user="+$cookies.getObject('user').email)
              .success(function(data) {
                  $rootScope.contacts = data.map(function (con) {
                      con._loweremail = con.email.toLowerCase();
                    return con;
                  });
              })
          }
      }
  }
  /** @ngInject */
  function EmailUrlController(SendEmailApiFactory, getContactsApiFactory) {
      this.email = {
              to: [],
      }

      this.reset = function() {
          this.email = {
                  to: [],
          }
      }
      getContactsApiFactory();
      this.submit = function(email) {
          SendEmailApiFactory(email, 'emails/sendurl/');
      }
  }
  /** @ngInject */
  function EmailHtmlController($sce, SendEmailApiFactory, getContactsApiFactory) {
	this.email = {
			to: [],
	}

    this.reset = function() {
        this.email = {
                to: [],
        }
    }
	getContactsApiFactory();
	this.html_preview = function(html) {
	    this.preview =  $sce.trustAsHtml(html);
	}
    this.submit = function(email) {
        SendEmailApiFactory(email, 'emails/sendhtml/');
    }
  }
  /** @ngInject */
  function EmailHistoryController($rootScope, $http, $cookies, $mdToast, apiurl) {
      this.resend = function(id) {
          $(".page-loading").removeClass("hidden");
          $http.get(apiurl+'emails/'+id+'/resend?g_token='+$cookies.get('g_token')+"&user="+$cookies.getObject('user').email)
          .success(function(data) {
              $(".page-loading").addClass("hidden");
              $mdToast.show(
                    $mdToast.simple()
                      .content('Email sent Ok! ;)')
                      .position('top right')
                      .hideDelay(3000)
                  );
          })
      }
      
      if($cookies.get('g_token')!==undefined){
          $rootScope.is_login=true;
          $(".page-loading").removeClass("hidden");
          $http.get(apiurl+'emails/history/?g_token='+$cookies.get('g_token')+"&user="+$cookies.getObject('user').email)
          .success(function(data) {
              $(".page-loading").addClass("hidden");
              $rootScope.emails = data;
          }).
          error(function(data, status, headers, config) {
              console.log(data);
              console.log(status);
              console.log(headers);
              console.log(config);
              $(".page-loading").addClass("hidden");
              if(data.detail=='invalid_token'){
                  $cookies.putObject('user','');
                  $cookies.put('g_token','');
                  $cookies.put('is_login',false);
                  $rootScope.is_login=false;
                  $rootScope.user="";
                  
                  $rootScope.form_error_msg="Tu Token ha expirado, vuelve a loguear con Google";
              }else{
                  $rootScope.form_error_msg=data;
              }
              $(".page-loading").addClass("hidden");
              $rootScope.show_server_errors=true;
              $rootScope.form_error_msg=data;
              $mdToast.show(
                        $mdToast.simple()
                          .content('Backend Error!')
                          .position('top right')
                          .hideDelay(3000)
                      );
          });
      }else{
          $rootScope.is_login=false;
      }

  }
})();
