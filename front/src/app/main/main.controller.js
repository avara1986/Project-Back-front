(function() {
  'use strict';

  angular
    .module('front')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $scope, webDevTec, toastr) {
    var vm = this;
    
    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1442678867860;

    activate();

    function activate() {
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }
  }
})();
