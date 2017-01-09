'use strict';

class RestoreController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state, $stateParams) {
    this.Auth = Auth;
    this.$state = $state;
    this.$stateParams = $stateParams;
  }

  restore(form) {
    debugger;
    this.submitted = true;

    if (form.$valid) {
      this.Auth.restorePassword({
          token: this.$stateParams.token,
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
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
  .controller('RestoreController', RestoreController);
