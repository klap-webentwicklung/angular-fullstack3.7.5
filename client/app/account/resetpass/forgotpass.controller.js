'use strict';

class ForgotpassController {
    constructor(Auth, $state, $http) {
        this.user = {};
        this.errors = {};
        this.success = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
        this.testMsg = 'hello from node mailer';
    }

    sendMail() {


        // Send E-Mail with Node Mailer
        this.$http.post('/api/reset/forgot', {

            email: this.user.email

        }).then(() => {
                    // Logged in, redirect to home
                    this.success.other = 'An email has been sent to the provided email with further instructions.';
                    this.errors.other = '';
                    console.log("Message sent successfully!");
                })
                .catch(err => {
                    this.success.other = '';
                    this.errors.other = err.data.message;
                    console.log("Message sent failed!");
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

}

angular.module('weindbApp')
    .controller('ForgotpassController', ForgotpassController);
