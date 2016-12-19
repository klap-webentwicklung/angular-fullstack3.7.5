'use strict';

angular.module('weindbApp.admin')
  .config(function($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      authenticate: 'admin'
    })

    $stateProvider.state('detailadmin', {
    	url: '/detailadmin/:id',
    	templateUrl: 'app/admin/detailadmin.html',
      controller: 'DetailAdminController',
    	controllerAs: 'detailadmin',
    	authenticate: 'admin'
    });
  });
