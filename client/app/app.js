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
  .translations('en', translationsEN)
  .translations('de', translationsDE)
  .preferredLanguage('en');


  });

  var translationsEN = {
    HEADLINE: 'What an awesome module!',
    PARAGRAPH: 'Srsly!',
    PASSED_AS_TEXT: 'Hey there! I\'m passed as text value!',
    PASSED_AS_ATTRIBUTE: 'I\'m passed as attribute value, cool ha?',
    PASSED_AS_INTERPOLATION: 'Beginners! I\'m interpolated!',
    VARIABLE_REPLACEMENT: 'Hi {{name}}',
    BUTTON_LANG_DE: 'German',
    BUTTON_LANG_EN: 'English'
  };
   
  var translationsDE= {
    HEADLINE: 'Was für ein großartiges Modul!',
    PARAGRAPH: 'Ernsthaft!',
    PASSED_AS_TEXT: 'Hey! Ich wurde als text übergeben!',
    PASSED_AS_ATTRIBUTE: 'Ich wurde als Attribut übergeben, cool oder?',
    PASSED_AS_INTERPOLATION: 'Anfänger! Ich bin interpoliert!',
    VARIABLE_REPLACEMENT: 'Hi {{name}}',
    BUTTON_LANG_DE: 'Deutsch',
    BUTTON_LANG_EN: 'Englisch'
  };
