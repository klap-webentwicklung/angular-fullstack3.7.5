'use strict';

class LoginController {
    constructor(Auth, $state, $http) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
        this.testMsg = 'hello from node mailer';
    }

    generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        console.log('New Password: ', retVal);
        return retVal;
        
    }

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


    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Logged in, redirect to home
                    this.$state.go('main');
                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }
}

angular.module('weindbApp')
    .controller('LoginController', LoginController);
