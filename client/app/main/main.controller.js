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

      this.$rootScope.$on('$translateChangeSuccess', function () {
        this.$translate('HEADLINE').then(function (translation) {
          self.headlineOnRootscope = translation;
        }, function (translationId) {
          self.headlineOnRootscope = translationId;
        });
      });

      this.$translate('HEADLINE').then(function (headline) {
        self.headline = headline;
        console.log('​MainController -> $onInit -> self.headline:', self.headline);
        
      }, function (translationId) {
        this.headline = translationId;
        console.log('​MainController -> $onInit -> this.headline', this.headline);
      });
      this.$translate('PARAGRAPH').then(function (paragraph) {
        self.paragraph = paragraph;
      }, function (translationId) {
        this.paragraph = translationId;
      });
      this.$translate('NAMESPACE.PARAGRAPH').then(function (anotherOne) {
        self.namespaced_paragraph = anotherOne;
      }, function (translationId) {
        this.namespaced_paragraph = translationId;
      });

      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

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
