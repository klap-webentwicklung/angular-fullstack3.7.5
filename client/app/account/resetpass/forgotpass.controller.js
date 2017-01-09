'use strict';

class ForgotpassController {
    constructor(Auth, $state, $http) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
        this.testMsg = 'hello from node mailer';
    }

    sendMail() {


        // Send E-Mail with Node Mailer
        this.$http.post('/api/sendmails', {

            data: this.user.email

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

    checkMail() {

    }

    sendRecovMail(form) {
        console.log('sendRecovMail triggered');
        this.submitted = true;

        if (form.$valid) {
            this.checkMail();
            this.sendMail();
        }
    }


    // login(form) {
    //     this.submitted = true;

    //     if (form.$valid) {
    //         this.Auth.login({
    //                 email: this.user.email,
    //                 password: this.user.password
    //             })
    //             .then(() => {
    //                 // Logged in, redirect to home
    //                 this.$state.go('main');
    //             })
    //             .catch(err => {
    //                 this.errors.other = err.message;
    //             });
    //     }
    // }
}

angular.module('weindbApp')
    .controller('ForgotpassController', ForgotpassController);
