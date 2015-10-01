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
		$rootScope.show_form_error=false;
        $http.post(apiurl+'emails/sendurl/', this.parseData(email, $cookies.get('g_token')))
        .success(function(data) {
            console.log(data);
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
            $rootScope.show_form_error=true;
            $rootScope.form_error_msg=data;
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
  function EmailHtmlController($timeout, $rootScope, $http, $cookies, apiurl) {
		this.email = {
				to: [],
		}

		this.reset = function() {
			this.email = {
					to: [],
			}
		}
		this.submit = function(emai) {
	        $http.post(apiurl+'emails/send-html/', emai)
	        .success(function(data) {
	            console.log(data);
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
  function EmailHistoryController($timeout, $rootScope, $http, $cookies, apiurl) {
	$rootScope.is_login = $cookies.get('is_login');
	//console.log($rootScope.is_login);
	$rootScope.user = $cookies.getObject('user');
  }
})();
