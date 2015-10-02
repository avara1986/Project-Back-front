(function() {
  'use strict';

  angular
    .module('front')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, $mdSidenav , $mdUtil, $log, toastr) {
    $scope.toggleLeft = buildToggler('left');
    function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle()
                .then(function () {
                  $log.debug("toggle " + navID + " is done");
                });
            },200);
        return debounceFn;
    }
    $scope.close = function () {
        $mdSidenav('left').close()
          .then(function () {
            $log.debug("close LEFT is done");
          });
      };
  }
})();
