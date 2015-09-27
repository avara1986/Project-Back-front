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
	this.submit = function(email) {
        $http.post(apiurl+'emails/send-url/', {'email': email, 'g_token': $cookies.get('g_token')})
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
