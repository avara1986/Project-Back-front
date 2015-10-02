(function() {
  'use strict';

  angular
    .module('front')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
      $rootScope
      .$on('$stateChangeStart', 
          function(event, toState, toParams, fromState, fromParams){ 
              $("#ui-view").html("");
              $(".page-loading").removeClass("hidden");
      });

      $rootScope
      .$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams){ 
              $(".page-loading").addClass("hidden");
      });
    $log.debug('runBlock end');
  }

})();
