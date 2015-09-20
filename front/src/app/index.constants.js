/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('front')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('apiurl', 'http://192.168.100.3:8000/');

})();
