'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    // node mailer test
        sendMail() {

        // Send E-Mail with Node Mailer
        this.$http.post('/api/sendmails', {
            // method: 'POST',
            // url: 'api/sendmail',
            data: this.submitted
            // statusText: 'I am sent'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('sendEmail sucessful');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('sendEmail not sucessful');
        });

    }

    $onInit() {
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
