'use strict';

angular.module('weindbApp', ['weindbApp.auth', 'weindbApp.admin', 'weindbApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'pascalprecht.translate'
  ])
  .config(function($urlRouterProvider, $locationProvider, $translateProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    // add translation table
  $translateProvider
  .translations('en', translations)
  .preferredLanguage('en');


  });

  var translations = {
    HEADLINE: 'What an awesome module!',
    PARAGRAPH: 'Srsly!',
    NAMESPACE: {
      PARAGRAPH: 'And it comes with awesome features!'
    }
  };
