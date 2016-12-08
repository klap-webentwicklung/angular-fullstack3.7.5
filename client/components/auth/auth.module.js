'use strict';

angular.module('weindbApp.auth', ['weindbApp.constants', 'weindbApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
