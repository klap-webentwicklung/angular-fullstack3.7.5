'use strict';

class ResetpassController {
    constructor(Auth, $state, $http) {
        this.user = {};
        this.errors = {};
        this.submitted = false;
        this.$http = $http;
        this.Auth = Auth;
        this.$state = $state;
        this.testMsg = 'hello from node mailer';
        this.match = false;
    }

    resetPass(form) {
        this.submitted = true;
        this.match = (this.user.newPassword === this.user.confirmPassword);
        if (form.$valid && this.match) {

            this.$http.post('/api/reset/'+ this.$state.params.token, {
                    password: this.user.newPassword
                }).then(() => {
                    // Logged in, redirect to home
                    console.log("Reset Password successfully!");
                    this.$state.go('login');
                })
                .catch(err => {
                    this.errors.other = err.data.message;
                    console.log("Reset Password failed!");
                });
        }
    }

}

angular.module('weindbApp')
    .controller('ResetpassController', ResetpassController);
