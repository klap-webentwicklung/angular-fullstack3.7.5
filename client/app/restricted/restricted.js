'use strict';

angular.module('weindbApp')
  .config(function($stateProvider) {
    $stateProvider.state('restricted', {
      url: '/app/restricted/restricted.html',
      template: '<restricted></restricted>',
      authenticate: 'auther'
      // authenticate: 'admin'
    });
  });
