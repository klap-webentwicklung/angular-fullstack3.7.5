'use strict';

class SettingsController {
 
  constructor(Auth) {
    this.Auth = Auth;
    this.currentUser = Auth.getCurrentUser();
    this.user = this.currentUser;
    this.errors = {};
    this.submitted = false;
    console.log('Current User', this.currentUser);
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }


updateUser(form1) {
    this.submitted = true;

    if (form1.$valid) {
      console.log('update user triggered');
      this.Auth.updateUser(this.user.firstname, this.user.name)
        .then(() => {
          this.message = 'User updated successfully.';
        })
        .catch(() => {
          this.message = 'something went wrong';
        });
    }
  }
}

angular.module('weindbApp')
  .controller('SettingsController', SettingsController);
