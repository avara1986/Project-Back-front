(function() {
  'use strict';

  angular
    .module('front')
    .controller('EmailUrlController', EmailUrlController)
    .controller('EmailHtmlController', EmailHtmlController)
    .controller('EmailHistoryController', EmailHistoryController);

  /** @ngInject */
  function EmailUrlController($timeout, $rootScope, $http, $cookies, $mdToast, apiurl) {
	this.email = {
			to: [],
	}

	this.reset = function() {
		this.email = {
				to: [],
		}
	}
	this.parseData = function(data, token){
		var ndata = new Object();
		ndata.url = data.url;
		ndata.subject = data.subject;
		ndata.g_token = token;
		ndata.to = [];
		for (var i = 0; i < data.to.length; i++) { 
			var aux = new Object();
			console.log(data.to[i]);
			aux.email = data.to[i];
			
			ndata.to.push(aux);
		}
		return ndata;
	}
	this.submit = function(email) {
		$rootScope.show_server_errors=false;
		$(".page-loading").removeClass("hidden");
        $http.post(apiurl+'emails/sendurl/', this.parseData(email, $cookies.get('g_token')))
        .success(function(data) {
            console.log(data);
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
  /** @ngInject */
  function EmailHtmlController($timeout, $rootScope, $http, $cookies, $mdToast, $sce, apiurl) {
		this.email = {
				to: [],
		}

	    this.reset = function() {
	        this.email = {
	                to: [],
	        }
	    }
		this.html_preview = function(html) {
		    this.preview =  $sce.trustAsHtml(html);
		}
	    this.parseData = function(data, token){
	        var ndata = new Object();
	        ndata.content = data.html;
	        ndata.subject = data.subject;
	        ndata.g_token = token;
	        ndata.to = [];
	        for (var i = 0; i < data.to.length; i++) { 
	            var aux = new Object();
	            console.log(data.to[i]);
	            aux.email = data.to[i];
	            
	            ndata.to.push(aux);
	        }
	        return ndata;
	    }
	    this.submit = function(email) {
	        $rootScope.show_server_errors=false;
	        $(".page-loading").removeClass("hidden");
	        $http.post(apiurl+'emails/sendhtml/', this.parseData(email, $cookies.get('g_token')))
	        .success(function(data) {
	            console.log(data);
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
  /** @ngInject */
  function EmailHistoryController($timeout, $rootScope, $http, $cookies, $mdToast, apiurl) {
      $(".page-loading").removeClass("hidden");
      $http.get(apiurl+'emails/history/?g_token='+$cookies.get('g_token'))
      .success(function(data) {
          console.log(data);
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
  }
})();
