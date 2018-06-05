'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $translate, $rootScope) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.$translate = $translate;
      this.$rootScope = $rootScope;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {

      var self = this;

      // initially set language
      this.$translate('HEADLINE').then(function (translation) {
        self.headline = translation;
      }, function (translationId) {
        self.headline = translationId;
      });
      this.$translate('PARAGRAPH').then(function (paragraph) {
        self.paragraph = paragraph;
      }, function (translationId) {
        this.paragraph = translationId;
      });

      // on change language
      this.$rootScope.$on('$translateChangeSuccess', function () {

        self.$translate('HEADLINE').then(function (translation) {
          self.headline = translation;
        }, function (translationId) {
          self.headline = translationId;
        });
        self.$translate('PARAGRAPH').then(function (paragraph) {
          self.paragraph = paragraph;
        }, function (translationId) {
          this.paragraph = translationId;
        });
        
      });

      this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
    } // end $onInit

                  changeLanguage(langKey) {
                    this.$translate.use(langKey);
                  };

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('weindbApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
