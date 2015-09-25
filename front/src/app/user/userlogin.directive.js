(function() {
  'use strict';

  angular
    .module('front')
    .directive('googlePlusSignin', function () {
      return {
        restrict: 'E',
        template: '<span></span>',
        replace: true,
        link: function (scope, element, attrs) {
    
          // Set class.
          attrs.$set('class', 'g-signin');
    
          attrs.$set('data-clientid', attrs.clientid + '.apps.googleusercontent.com');
    
          // Some default values, based on prior versions of this directive
          var defaults = {
            callback: 'signinCallback',
            cookiepolicy: 'single_host_origin',
            requestvisibleactions: 'http://schemas.google.com/AddActivity',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            width: 'wide'
          };
    
          // Provide default values if not explicitly set
          angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
            if (!attrs.hasOwnProperty('data-' + propName)) {
              attrs.$set('data-' + propName, defaults[propName]);
            }
          });
    
          // Asynchronously load the G+ SDK.
          (function() {
            var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
            po.src = 'https://apis.google.com/js/client:plusone.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
          })();
        }
      };
    })
    .run(['$window','$http', '$rootScope',function($window, $http, $rootScope) {
        $window.signinCallback = function (authResult) {
            $rootScope.is_login=false;
            console.log(authResult);
            if (authResult && authResult.access_token){
                $http.get('https://www.googleapis.com/oauth2/v1/tokeninfo?id_token='+authResult.id_token)
                .success(function(data) {
                    console.log(data);
                    $rootScope.is_login=true;
                    $rootScope.user=data;
                });
                //https://www.googleapis.com/plus/v1/people/116599978027440206136
                //https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYTdhYzE0NmU4Nzc0NjJlZTI3Y2UzOTU0ODZjODNlM2ZmNTliOGQifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6ImRzSTNnbnNKaXRRZ2xVUzA5YmpHRnciLCJhdWQiOiI0MjgyODMxMzIxODctZjZydnBoZm84ZWZxN2xjZHJxdjQ0cGd1Z2ZzMzhyOHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJjX2hhc2giOiJBcDk4YTNmYi1LM1M2alV6Zk0tRWp3Iiwic3ViIjoiMTAxMzc5MTEyOTQyMTc1NDkwMDc4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjQyODI4MzEzMjE4Ny1mNnJ2cGhmbzhlZnE3bGNkcnF2NDRwZ3VnZnMzOHI4ci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImhkIjoiZ29iYWxvLmVzIiwiZW1haWwiOiJhLnZhcmFAZ29iYWxvLmVzIiwiaWF0IjoxNDQzMTc4ODMxLCJleHAiOjE0NDMxODI0MzF9.v5XzwW-Gi5Re_JjI7iv1UQQ8tP4cuE_mlL0-zL90t9uWFE06q0iY6Nu1TIm2fD881-XglW9sfG81NXBlXC8vvemMKqf1hhYJKw45SXlRGU0TstKwEUsVAMaPVZ_jU3P2XRRCsA2OWwEQFe7vsIcaqaeAhJPSO9KonOm46vguD5W3XT6cDmBSCMT3-7oYJJRCqWktlXgu89tvOMIgODUWc6xyF81apLrjXpQqyb9y8-f6Tj65Mb_5gigQ64cKvuhTYPA7KV4WbZDdVj7JlV9rFB166wI8LvrN13692DL8jL9gppm6tKApyDnV9Hxg4L61ZCzy8YihWh7QNDHDuaGgzQ
                $rootScope.$broadcast('event:google-plus-signin-success', authResult);
            } else {
                $rootScope.$broadcast('event:google-plus-signin-failure', authResult);
            }
        }; 
    }]);
})();