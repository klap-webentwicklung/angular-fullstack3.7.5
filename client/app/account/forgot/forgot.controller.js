'use strict';

class ForgotController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  restored = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  forgot(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.forgot(this.user.email)
        .then((res) => {
          this.restored = true;
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

angular.module('weindbApp')
  .controller('ForgotController', ForgotController);
